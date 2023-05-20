import React, {createContext} from "react";
import EmployeesS from "../services/employees.s";
import CookieH from "../helpers/cookie.h";
import DiplomaService from "../services/dilploma.s";
import DilplomaS from "../services/dilploma.s";
import {blobToBase64} from "base64-blob";
import IdTypesS from "../services/idTypes.s";
import PayModesS from "../services/payModes.s";
import SesAppS from "../services/sesApp.s";
import AppS from "../services/app.s";
import ClassesS from "../services/classes.s";
import SubjectsS from "../services/subjects.s";
import ReqCategoriesS from "../services/reqCategories.s";
import MySnackbar from "../components/mySnackbar";
import {Backdrop, CircularProgress} from "@material-ui/core";
import SessionExpired from "../layouts/nav/sessionExpired";
import AppChoiceS from "../services/appChoice.s";
import PlanningsS from "../services/plannings.s";
import {getMonSunDay} from "../helpers/app.h";
import {guid} from "react-agenda";
import ReqS from "../services/req.s";
import AuthS from "../services/auth.s";
import CookieC from "../constants/cookie.c";
import AutoLogOut from "../layouts/autoLogOut";
import SettingS from "../services/setting.s";
import {useNavigate} from "react-router-dom";

const Context = createContext()

class Global extends React.Component {
  
  initialState = {
    files: [],
    CLASSES: [],
    submitePerso: true,
    submiteFamily: true,
    submitteAdress: true,
    submittePro: true,
    submittedRh1: true,
    submittedRh2: true,
    submittedRh3: true,
    userAppSession: true,
    openFeature: false,
    
    categorie: 0,
    
    categories: [],
    applications: [],
    selected: [],
    selectedConfirmed: [],
    departments: [],
    school: [],
    classSchool: [],
    subjectClass: [],
    requestedSchoolList: [],
    anteriorSubjects: [],
    planningCourses: [],
    planningCoursesRequest: [],
    requestConcernedAuthor: [],
    
    REQUEST_ID: '',
    REQUEST_CATEGORY_ID: '',
    CLASS_ID: '',
    SUBJECT_ID: '',
    REQUEST_AUTHOR: '',
    REQUEST_PBLM_DATE: new Date().toDateString(),
    REQUEST_PBLM_WEEK: '',
    CONTRACT_NUMBER: '',
    TH_DISPLAYED: '',
    RIB: '',
    TH_EXPECTED: '',
    VH_DISPLAYED: '',
    VH_EXPECTED: '',
    TI_DISPLAYED: '',
    TI_EXPECTED: '',
    AMOUNT_RECEIVED: '',
    AMOUNT_EXPECTED: '',
    DESCRIPTION: '',
    
    RESQUEST_DISPCONFIG: {},
    statRequestForUser: {},
    
    settings: {lang: true},
  }
  
  state = {
    sesApp: CookieH.getSession(),
    application: CookieH.getApplication(),
    ...CookieH.getUser(),
    ...this.initialState,
    openBd: false,
  }
  
  tokenExpiredRedirection = () => {
    this.setState({openDg: true})
  }
  closeRegistration = () => {
    this.setState({open: true, complement: null})
    return new EmployeesS().closeSign(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200) {
        setTimeout(() => this.setState({
          open: false,
          ACTIVED: true,
          title: "Registration completed",
          openInfo: true
        }), 1000)
        CookieH.setUser({
          ...this.state,
          ACTIVED: true,
        })
      }
      return res
    }, err => {
      setTimeout(() => this.setState({
        open: false,
        openInfo: true,
        complement: err?.data,
        title: "Closure failure"
      }), 1000)
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      return err
    })
  }
  loginStepForSendCode = (email, matricule) => {
    if (email && matricule) {
      return new AuthS().login(email, matricule).then(res => {
        if (res.status === 200) {
          this.props.navigate("/verification-code", {state: {matricule, email}});
        } else
          this.setState({
            openSb: true,
            severitySb: 'error',
            messageSb: "Matricule or password incorrect"
          })
        return res
        
      }, err => {
        if (err) {
          if (err?.status === 401) {
            this.setState({
              openSb: true,
              severitySb: 'error',
              messageSb: "Your account is not actived"
            })
          } else this.setState({
            openSb: true,
            severitySb: 'error',
            messageSb: "Matricule or password incorrect"
          })
        } else {
          this.setState({
            openSb: true,
            severitySb: 'error',
            messageSb: "Connection fail. please try again"
          })
        }
        return err
      });
    } else {
      this.setState({
        openSb: true,
        severitySb: 'warning',
        messageSb: "Fill correctly the blanks to continue"
      })
    }
  };
  login = (user) => {
    new SesAppS().current().then(res2 => {
      
      if (res2.status === 200) {
        
        this.setState({sesApp: res2.data})
        CookieH.setSession(res2.data)
        
        new AppS().current(user.MATRICULE, res2.data.id).then(res3 => {
          if (res3.status === 200) {
            this.setState({application: res2.data})
            CookieH.setApplication(res3.data)
          }
        })
        
      }
      
    })
  };
  
  checkForSession = () => {
    return new SesAppS().current().then(res => {
      if (res.status === 200) {
        this.setState({sesApp: res.data})
        CookieH.setSession(res.data)
        
        let application = CookieH.getApplication()
        if (!application || application?.SESSION_APPLICATION_ID !== res.data.id) {
          CookieH.deleteApplication()
          this.setState({application: null})
          this.props.navigate("courses/help");
        }
      }
      return res
    }, err => {
      return err
    })
  };
  
  codeVerificator = (code, matricule) => {
    if (code) {
      new AuthS().codeVerification(code, matricule).then(res => {
        if (res.status === 200) {
          
          let user = res.data
          this.setUserData(user)
          this.login(user)
          this.props.navigate("/profile");
          
        }
      }, () => {
        this.setState({CODE_ERROR: true})
      });
    } else {
      this.setState({
        openSb: true,
        severitySb: 'warning',
        messageSb: "Fill correctly the blanks to continue"
      })
    }
  };
  setUserData = (user) => {
    let userData = {
      ...user,
      CODE1: (user?.NUMPHONE?.split(' ')[0][0] !== '+' ? '+237' : user?.NUMPHONE?.split(' ')[0]) || '+237',
      NUMPHONE: user?.NUMPHONE,
      CODE2: (user?.NUMPHONE2?.split(' ')[0][0] !== '+' ? '+237' : user?.NUMPHONE2?.split(' ')[0]) || '+237',
      NUMPHONE2: user?.NUMPHONE2,
      COUNTRY: user?.COUNTRY || 'Cameroon',
    }
    CookieH.setUser(userData);
    this.setState({openSb: false, ...userData})
  }
  updateStatus = (STATUS) => {
    return new EmployeesS().updateStatus({
      STATUS,
      MATRICULE: CookieH.getUser()?.MATRICULE
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          STATUS,
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true
        })
        CookieH.setUser(this.state)
      }
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  updatePersonal = () => {
    return new EmployeesS().updatePersonnal({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser(this.state)
        this.setState({
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submitePerso: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
      
    })
  }
  updateFamilial = () => {
    if (!this.state.EMERGNUM1 || !this.state.CIVILSTATUS ||
      !this.state.CHILDNUM || !this.state.EMERGNAME1) {
      this.setState({
        severitySb: 'warning',
        messageSb: "Provide all required informations to continue",
        openSb: true
      })
      return
    }
    
    if (!this.state.EMERGNUM1.match('^6(2|5|6|7|8|9)[0-9]{7,}')) {
      this.setState({
        severitySb: 'warning',
        messageSb: "The phone number format false",
        openSb: true
      })
      return
    }
    
    if (this.state.CIVILSTATUS === 'Married' && (
      (!this.state.SPLASTNAME || this.state.SPLASTNAME.length === 0) ||
      (!this.state.SPFIRSTNAME || this.state.SPFIRSTNAME.length === 0))
    ) {
      this.setState({
        severitySb: 'warning',
        messageSb: "Enter the informations about your spouse to continue",
        openSb: true
      })
      return
    }
    
    new EmployeesS().updateFamilial({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser(this.state)
        this.setState({
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submiteFamily: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
      
    })
  }
  updateAddress = () => {
    // if (!this.state.NUMPHONE.match('^6(2|5|6|7|8|9)[0-9]{7,}')) {
    //   this.setState({
    //     severitySb: 'warning',
    //     messageSb: "The N°1 phone number format false",
    //     openSb: true
    //   })
    //   return
    // }
    //
    //
    // if (this.state.NUMPHONE2 && !this.state.NUMPHONE2.match('^6(2|5|6|7|8|9)[0-9]{7,}')) {
    //   this.setState({
    //     severitySb: 'warning',
    //     messageSb: "The N°2 phone number format false",
    //     openSb: true
    //   })
    //   return
    // }
    
    if (!this.state.TOWN || !this.state.PRECINCT) {
      this.setState({
        severitySb: 'warning',
        messageSb: "Fill your living town and precinct to continue",
        openSb: true
      })
      return
    }
    
    new EmployeesS().updateAddress({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser(this.state)
        this.setState({
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submitteAdress: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
      
    })
  }
  updateProfessional = () => {
    new EmployeesS().updateProfessional({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser(this.state)
        this.setState({
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submittePro: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
      
    })
  }
  updateLastDiploma = () => {
    new EmployeesS().updateLastDiploma({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser(this.state)
        this.setState({
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
      
    })
  }
  defineLastDiploma = (id) => {
    new EmployeesS().defineLastDiploma(this.state.MATRICULE, id).then(res => {
      if (res.status === 200) {
        this.setState({LASTDIPLOMA: id})
        CookieH.setUser(this.state)
        this.setState({
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
      })
      
    })
  }
  loadDiploma = () => {
    new DiplomaService().getByEmployee(this.state.MATRICULE).then(r => {
      if (r.status === 200) {
        this.setState({files: r.data, openBd: false})
      }
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  loadClasses = () => {
    new ClassesS().getClasses().then(res => {
      if (res.status === 200) {
        this.setState({CLASSES: res.data})
      }
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  loadIdentiTypes = () => {
    new IdTypesS().getAll().then(res => {
      if (res.status === 200)
        this.setState({identifTypes: res.data})
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  loadPayModes = () => {
    new PayModesS().getAll().then(res => {
      if (res.status === 200)
        this.setState({payModes: res.data})
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  loadRequestCategories = () => {
    new ReqCategoriesS().getCategories().then(res => {
      this.setState({categories: res.data})
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  loadRequestSchoolList = () => {
    new ClassesS().getSchoolListAffected().then(res => {
      if (res.status === 200)
        this.setState({school: res.data || []})
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  uploadCV = async (files) => {
    new EmployeesS().uploadCV({
      ...this.state,
      FILE: await blobToBase64(files[0]),
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser({...this.state, ...res.data})
        console.log(res.data.CV_LINK)
        this.setState({
          CV_LINK: res.data.CV_LINK,
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      if (err?.status === 400)
        this.setState({
          severitySb: 'error',
          messageSb: err?.data?.messageSb === 'exists' ?
            "Error, a similar file already exists" : err?.data?.messageSb,
          openSb: true
        })
      
    })
  }
  createDiploma = async (files) => {
    this.setState({openBd: true})
    setTimeout(async () => {
      if (this.state.DESIGNATION && this.state.SPECIALITY && this.state.LEVEL && this.state.LANGUAGE && this.state.OBTENEDDATE && this.state.OBTENEDSTAB) {
        new DilplomaS().createDiploma({
          ...this.state,
          FILE: await blobToBase64(files[0]),
        }).then(res => {
          if (res.status === 201) {
            CookieH.setUser(this.state)
            this.loadDiploma()
            this.setState({
              severitySb: 'success',
              messageSb: "File successfully saved",
              openSb: true
            })
          }
        }).catch(err => {
          
          if (err?.status === 401)
            return this.tokenExpiredRedirection()
          
          if (err?.status === 400)
            this.setState({
              severitySb: 'error',
              messageSb: err?.data?.messageSb === 'exists' ?
                "Error, a similar file already exists" : err?.data?.messageSb,
              openSb: true
            })
        }).finally(() => {
        
        })
      } else {
        setTimeout(() => {
          this.setState({openBd: false})
        }, 500)
        this.setState({
          severitySb: 'warning',
          messageSb: "Provide all required informations to continue",
          openSb: true
        })
      }
    }, 500)
  }
  
  closeBackdrop = () => {
    setTimeout(() => {
      this.setState({openBd: false})
    }, 500)
  }
  
  openBackdrop = () => {
    this.setState({openBd: true})
  }
  
  updateFinancial = () => {
    if (this.state.ACTIVITY_PRINCIPAL !== 'officer')
      this.setState({PRESENCE_ATTEST: null, MINISTERIAL_DECREE: null})
    new EmployeesS().updateFinancial({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser({...this.state, ...res.data})
        this.setState({
          ...res.data,
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submittedRh2: true
        })
      }
    }, err => {
      
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
      
    })
  }
  updatePaymentMode = () => {
    new EmployeesS().updatePaymentMode({
      ...this.state
    }).then(res => {
        if (res.status === 200) {
          this.setState({...res.data}, () => {
            CookieH.setUser(this.state)
          })
          
          this.setState({
            severitySb: 'success',
            messageSb: "Successly saved",
            openSb: true,
            submittedRh3: true
          })
        }
      },
      err => {
        if (err?.status === 401)
          return this.tokenExpiredRedirection()
        
        this.setState({
          severitySb: 'error',
          messageSb: "An error has occured during saving",
          openSb: true
        })
      })
  }
  updateIdentification = () => {
    new EmployeesS().updateIdentification({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser({...this.state, ...res.data})
        this.setState({
          ...res.data,
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submittedRh1: true
        })
      }
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
    })
  }
  updateTravelIdentification = () => {
    new EmployeesS().updateTravelIdentification({
      ...this.state
    }).then(res => {
      if (res.status === 200) {
        CookieH.setUser({...this.state, ...res.data})
        this.setState({
          ...res.data,
          severitySb: 'success',
          messageSb: "Successly saved",
          openSb: true,
          submittedRhPass: true
        })
      }
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
      
      this.setState({
        severitySb: 'error',
        messageSb: "An error has occured during saving",
        openSb: true
      })
    })
  }
  removeDiploma = (col) => {
    new EmployeesS().removeFile(this.state[col], col, this.state.MATRICULE).then(res => {
      if (res.status === 200) {
        let data = {}
        data[col] = null
        this.setState(data)
        let newUser = {...this.state}
        delete newUser[col]
        CookieH.setUser(newUser)
      }
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  handleSetRequestClass = (event) => {
    this.setState({classSchool: [], BRANCH_ABREVIATION: event.target.value})
    new ClassesS().getSchoolClassAffected(event.target.value).then(res => {
      console.log(res)
      this.setState({classSchool: res.data})
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  handleSetRequestSubject = (event, value) => {
    this.setState({CLASS_ID: value?.CLASS_ID, subjectClass: []})
    new SubjectsS().getSubjectClassAffected(value?.CLASS_ID).then(res => {
      this.setState({subjectClass: res.data || []})
    }, err => {
      if (err?.status === 401)
        return this.tokenExpiredRedirection()
    })
  }
  contactUs = (OBJECT, MESSAGE, FULLNAME, EMAIL, MATRICULE, NUMPHONE) => {
    return new EmployeesS().contactUs(
      OBJECT,
      MESSAGE,
      FULLNAME,
      EMAIL,
      MATRICULE,
      NUMPHONE).then(res => {
      if (res.status === 200)
        this.setState({
          severitySb: 'success',
          messageSb: "Mail send successfully",
          openSb: true,
        })
      return res
    })
  }
  getMyApplications = () => {
    new AppS().getAll(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200)
        this.setState({applications: res.data})
    })
  }
  
  getMyAnteriorSubjects = () => {
    new AppChoiceS().getOlder(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200)
        this.setState({anteriorSubjects: res.data})
    })
  }
  
  getMyApplicationChoices = () => {
    if (CookieH.getSession() && CookieH.getApplication() && CookieH.getSession()?.id === CookieH.getApplication()?.SESSION_APPLICATION_ID)
      new AppChoiceS().gets(CookieH.getApplication()?.id).then(res => {
        if (res.status === 200) {
          this.setState({
            selected: res.data.filter(e => e.AFFECTATION !== 1).map(e => ({
              ...e.Subject,
              CHOICE: e.Subject.SUBJECT_ID,
              CAT: e.CATEGORY
            })) || [],
            selectedConfirmed: res.data.filter(e => e.AFFECTATION === 1).map(e => ({
              ...e.Subject,
              CHOICE: e.Subject.SUBJECT_ID,
              CAT: e.CATEGORY
            })) || []
          })
        }
      })
  }
  
  loadPlanning = () => {
    let toDay = new Date();
    let lastWeekToDay = new Date()
    lastWeekToDay.setDate(toDay.getDate() - 28);
    
    new PlanningsS().getTeacherTimeTable(
      {
        EMAIL: CookieH.getUser()?.EMAIL,
        MATRICULE: CookieH.getUser()?.MATRICULE,
        START_DATE: getMonSunDay(lastWeekToDay)[0],
        END_DATE: getMonSunDay(toDay)[1]
      }).then(res => {
      console.log(res.data)
      let planningCourses = res.data.map((course) => {
        let date = new Date(course.Lesson_Date)
        return {
          startDateTime: new Date(date.setHours(course.Lesson_Begin_Time.split(':')[0], course.Lesson_Begin_Time.split(':')[1])),
          endDateTime: new Date(date.setHours(course.Lesson_End_Time.split(':')[0], course.Lesson_End_Time.split(':')[1])),
          classes: course.Lesson_Status,
          _id: guid(),
          name: course.Subject_Name,
          ...course
        }
      })
      this.setState({
        planningCourses,
        planningCoursesRequest: planningCourses,
        openSb: true,
        messageSb: "Data loaded successfully",
        severitySb: "success"
      })
    }).catch(() => {
      this.setState({openSb: true, messageSb: "Unable to load data. Please retry", severitySb: "error"})
    })
  }
  
  loadRequest = () => {
    new ReqS().getRequestConcernedAuthor(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200)
        this.setState({requestConcernedAuthor: res.data || []})
    })
    
    new ReqS().getStatRequestForUser(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200)
        this.setState({statRequestForUser: res.data})
    })
  }
  
  ttlAct = () => {
    let time = CookieC.TTL
    
    const fn = () => {
      time--
      if (time <= 0) {
        clearInterval(timer)
        this.setState({autoLogOut: true, features: true})
      }
    }
    
    
    let timer = setInterval(fn, 1000)
    
    window.onclick = () => {
      clearInterval(timer)
      time = CookieC.TTL
      timer = setInterval(fn, 1000)
      
    }
  }
  logOut = () => {
    let res = CookieH.clearUserData()
    this.setState({MATRICULE: null})
    if (res)
      this.props.navigate('/login')
    window.onclick = null
  }
  
  setSettings = () => {
    new SettingS().set(this.state.settings).then(res => {
      console.log(res)
    })
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.id !== this.state.id && !!this.state.id) {
      this.loadData()
    }
  }
  
  loadData = () => {
    this.loadDiploma()
    this.loadClasses()
    this.loadIdentiTypes()
    this.loadPayModes()
    this.loadRequestCategories()
    this.loadRequestSchoolList()
    this.getMyApplications()
    this.getMyApplicationChoices()
    this.getMyAnteriorSubjects()
    this.loadPlanning()
    this.loadRequest()
    
    this.ttlAct()
  }
  
  componentDidMount() {
    if (!!this.state.id) {
      this.loadData()
    }
  }
  
  
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setState: (e, f) => this.setState(e, () => {
            if (f) f()
          }),
          navigate: this.props.navigate,
          updateStatus: this.updateStatus,
          updatePersonal: this.updatePersonal,
          updateFamilial: this.updateFamilial,
          updateAddress: this.updateAddress,
          updateProfessional: this.updateProfessional,
          defineLastDiploma: this.defineLastDiploma,
          createDiploma: this.createDiploma,
          loadDiploma: this.loadDiploma,
          updateFinancial: this.updateFinancial,
          updatePaymentMode: this.updatePaymentMode,
          updateIdentification: this.updateIdentification,
          updateTravelIdentification: this.updateTravelIdentification,
          loginStepForSendCode: this.loginStepForSendCode,
          codeVerificator: this.codeVerificator,
          contactUs: this.contactUs,
          handleCloseSign: this.closeRegistration,
          removeDiploma: this.removeDiploma,
          handleSetRequestClass: this.handleSetRequestClass,
          handleSetRequestSubject: this.handleSetRequestSubject,
          loadRequestCategories: this.loadRequestCategories,
          uploadCV: this.uploadCV,
          getMyApplications: this.getMyApplications,
          openBackdrop: this.openBackdrop,
          closeBackdrop: this.closeBackdrop,
          loadPlanning: this.loadPlanning,
          loadRequest: this.loadRequest,
          checkForSession: this.checkForSession,
          setSettings: this.setSettings,
        }}
      >
        <div className='h-full w-full absolute' style={{top: 0, left: 0}}>
          <Backdrop open={this.state.openBd || false} style={{zIndex: 100}}
                    className='h-full w-full absolute'>
            <CircularProgress color="inherit"/>
          </Backdrop>
        </div>
        {this.state.autoLogOut && <AutoLogOut
          open={this.state.autoLogOut}
          handleCancel={() => {
            this.setState({autoLogOut: false})
          }} handleClose={() => {
          this.logOut()
          this.setState({autoLogOut: false})
        }}/>}
        <MySnackbar
          open={this.state.openSb}
          setClose={() => this.setState({openSb: false})}
          message={this.state.messageSb}
          severiry={this.state.severitySb}/>
        <SessionExpired open={this.state.openDg || false} handleClose={() => {
          this.setState({openDg: false, MATRICULE: null})
          CookieH.clearUserData()
          this.props.navigate('login')
        }}/>
        {this.props.children}
      </Context.Provider>
    )
  }
  
}

export default (props) => {
  const navigate = useNavigate()
  return <Global navigate={navigate} {...props}/>
}
export {Context as GlobalContext}
