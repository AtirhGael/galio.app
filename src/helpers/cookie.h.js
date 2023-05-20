import cookieConstants from '../constants/cookie.c';
import CookieC from '../constants/cookie.c';
import Cookies from 'universal-cookie'

export default class CookieH {
  static getUser = () => {
    return new Cookies().get(cookieConstants.FP_DATA)
  }

  static getApplication = () => {
    return new Cookies().get(cookieConstants.FP_APPLICATION)
  }
  static deleteApplication = () => {
    new Cookies().remove(cookieConstants.FP_APPLICATION)
  }
  
  static getSession = () => {
    return new Cookies().get(cookieConstants.FP_SESSION)
  }

  static clearUserData = () => {
    let cookies = new Cookies();
    cookies.remove(cookieConstants.FP_DATA)
    cookies.remove(cookieConstants.FP_APPLICATION)
    cookies.remove(cookieConstants.FP_STATUS)
    cookies.remove(cookieConstants.FP_SESSION)
    return 1
  }

  static setApplication = (application) => {
    new Cookies().set(cookieConstants.FP_APPLICATION, application, {path: '/'})
  }
  static setSession = (session) => {
    new Cookies().set(cookieConstants.FP_SESSION, session, {path: '/'})
  }

  static setUser = (
    {
      id,
      MATRICULE,
      ACTIVED,
      FIRSTNAME,
      LASTNAME,
      CV_LINK,
      STATUS,
      DENOMINATION,
      GENDER,
      GMAIL_ACCOUNT,
      BIRTHDATE,
      BIRTHPLACE,
      COUNTRY = 'Cameroon',
      IDENTITY1,
      ACTIVITY_PRINCIPAL,
      IDENTITY2,
      TOWN,
      DISTRICT,
      PRECINCT,
      EMAIL,
      CIVILSTATUS,
      SPFIRSTNAME,
      SPLASTNAME,
      SPBIRTHDATE,
      CHILDNUM,
      EMERGNAME1,
      EMERGNUM1,
      EMERGNAME2,
      EMERGNUM2,
      JOBTITLE,
      LECTURER,
      ORGA1,
      ORGA2,
      ORGA3,
      ORGA4,
      RIB_LINK,
      ORGA5,
      CONTENDDATE,
      LASTDIPLOMA,
      LASTJOB,
      LASTEMPLOYER,
      LASTJOBSTART,
      LASTJOBEND,
      LASTJOBSTILL,
      IDENTIFICATION,
      IDENTIFNUM,
      IDENTIFPLACE,
      IDENTIFSTART,
      IDENTIFEND,
      NIU,
      NIU_LINK,
      CNPS_LINK,
      CNPSYN = true,
      CNPSNUM,
      BASESALARY,
      HOURRATE,
      PAYMODE,
      EMAIL_VERIFICATION_TOKEN,
      EMAIL_VERIFIED,
      createdAt,
      updatedAt,
      CODE1 = '+237',
      CASHIER_CODE,
      ACCOUNT_NUM,
      NUMPHONE,
      CODE2 = '+237',
      NUMPHONE2,
      RIB_KEY,
      ACCOUNT_LASTNAME,
      ACCOUNT_FIRSTNAME,
      MINISTERIAL_DECREE,
      PRESENCE_ATTEST,
      ACCOUNT_BIRTHDATE,
      ACCESS_COURSES,
      TOKEN,
    }) => {
    new Cookies().set(CookieC.FP_DATA,
      {
        id,
        MATRICULE,
        ACTIVED,
        FIRSTNAME,
        LASTNAME,
        STATUS,
        GMAIL_ACCOUNT,
        DENOMINATION,
        GENDER,
        BIRTHDATE,
        BIRTHPLACE,
        COUNTRY,
        TOWN,
        CV_LINK,
        DISTRICT,
        PRECINCT,
        EMAIL,
        RIB_LINK,
        NIU_LINK,
        CNPS_LINK,
        CIVILSTATUS,
        SPFIRSTNAME,
        SPLASTNAME,
        SPBIRTHDATE,
        CHILDNUM,
        EMERGNAME1,
        EMERGNUM1,
        EMERGNAME2,
        EMERGNUM2,
        JOBTITLE,
        LECTURER,
        ORGA1,
        ORGA2,
        IDENTITY1,
        IDENTITY2,
        ACTIVITY_PRINCIPAL,
        MINISTERIAL_DECREE,
        PRESENCE_ATTEST,
        ORGA3,
        ORGA4,
        ORGA5,
        CONTENDDATE,
        LASTDIPLOMA,
        LASTJOB,
        LASTEMPLOYER,
        LASTJOBSTART,
        LASTJOBEND,
        LASTJOBSTILL,
        IDENTIFICATION,
        IDENTIFNUM,
        IDENTIFPLACE,
        IDENTIFSTART,
        IDENTIFEND,
        NIU,
        CNPSYN,
        CNPSNUM,
        BASESALARY,
        HOURRATE,
        PAYMODE,
        EMAIL_VERIFICATION_TOKEN,
        EMAIL_VERIFIED,
        createdAt,
        updatedAt,
        CASHIER_CODE,
        ACCOUNT_NUM,
        RIB_KEY,
        CODE1,
        NUMPHONE,
        CODE2,
        NUMPHONE2,
        ACCOUNT_LASTNAME,
        ACCOUNT_FIRSTNAME,
        ACCESS_COURSES,
        ACCOUNT_BIRTHDATE,
        TOKEN
      }, {path: '/'})
  }

  static getStatus = () => {
    new Cookies().get(CookieC.FP_STATUS)
  }

  static setStatus = (data) => {
    new Cookies().set(CookieC.FP_STATUS, data)
  }

  static setVersion = () => {
    new Cookies().set(CookieC.FP_VERSION, CookieC.VERSION)
  }

  static getVersion = () => {
    return new Cookies().get(CookieC.FP_VERSION)
  }
}
