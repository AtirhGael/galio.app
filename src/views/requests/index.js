import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Button from "@material-ui/core/Button";
import Categories from "./steps/categories";
import Motif from "./steps/motif";
import conpletedSteps from "../../assets/img/completed.svg";
import Cookies from "universal-cookie";
import Details from "./steps/details/details";
import ReqS from "../../services/req.s";
import {CircularProgress, StepLabel} from "@material-ui/core";
import CookieH from "../../helpers/cookie.h";
import {GlobalContext} from "../../utilities/Global";
import {FormattedMessage} from "react-intl";

export default class Request extends React.Component {
  cookies = new Cookies();
  state = {
    categorie: 0,
    categories: [],
    departments: [],
    activeStep: 0,
    completed: {},
  };
  
  getSteps = () => {
    return [
      "Request category",
      "Reason for request",
      "Request details",
    ];
  };
  
  clickHandler = () => {
    this.setState({canpreview: false});
    setTimeout(() => this.setState({canpreview: true}), 500);
  };
  
  
  handleReset = () => {
    this.setState({activeStep: 0});
  };
  
  handleStep = (activeStep) => () => {
    if (activeStep === 0) {
      if (CookieH.getUser()?.STATUS === null) this.setState({activeStep});
    } else this.setState({activeStep});
  };
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          const getStepContent = (stepIndex) => {
            switch (stepIndex) {
              case 0:
                return (
                  <Categories
                    handleNext={handleNext}
                    state={this.state}
                    setState={(e) => this.setState(e)}
                  />
                );
              case 1:
                return (
                  <Motif
                    handleNext={handleNext}
                    state={this.state}
                    setState={(e) => this.setState(e)}
                  />
                );
              case 2:
                return (
                  <Details
                    handleNext={handleNext}
                    state={this.state}
                    setState={(e) => this.setState(e)}
                  />
                );
              default:
                return "Unknown stepIndex";
            }
          };
          
          
          const clearRequest = () => {
            context.setState(
              {
                planningCoursesRequest: context.state.planningCourses,
                REQUEST_ID: null,
                REQUEST_CATEGORY_ID: null,
                CLASS_ID: null,
                SUBJECT_ID: null,
                REQUEST_AUTHOR: null,
                REQUEST_PBLM_DATE: null,
                REQUEST_PBLM_WEEK: null,
                CONTRACT_NUMBER: null,
                TH_DISPLAYED: null,
                TH_EXPECTED: null,
                VH_DISPLAYED: null,
                VH_EXPECTED: null,
                TI_DISPLAYED: null,
                TI_EXPECTED: null,
                AMOUNT_RECEIVED: null,
                AMOUNT_EXPECTED: null,
                REQUEST_PBLM_HOUR_END: null,
                REQUEST_PBLM_HOUR_START: null,
                DESCRIPTION: null,
                REQUEST_OBJECT: null,
                BRANCH_ABREVIATION: null,
                categorie: null,
              })
          }
          
          const handleNext = () => {
            switch (this.state.activeStep) {
              case 0:
                if (context.state.categorie)
                  this.setState({activeStep: this.state.activeStep + 1});
                else
                  context.setState({messageSb: "Please select a type of request", openSb: true, severitySb: "warning"})
                break
              case 1:
                if (context.state.REQUEST_CATEGORY_ID)
                  this.setState({activeStep: this.state.activeStep + 1});
                else
                  context.setState({
                    severitySb: 'warning',
                    messageSb: "Please make sure to select a category before continue",
                    openSb: true
                  })
                break
              case 2:
                if (context.state.DESCRIPTION?.length > 0)
                  this.setState({activeStep: this.state.activeStep + 1});
                else
                  context.setState({
                    severitySb: 'warning',
                    messageSb: "Please make sure to fill all the required field before continue",
                    openSb: true
                  })
                break
              default:
                this.setState({activeStep: this.state.activeStep + 1});
                break
              
            }
          };
          
          const handleBack = () => {
            window.scrollTo(0, 0);
            this.setState({activeStep: this.state.activeStep - 1});
          };
          return (
            <div
              className="max-w-screen-2xl mx-auto p-12 relative shadow-2xl bg-gradient-to-r from-gray-50 bg-white rounded-xl">
              {/*<Stepper*/}
              {/*  activeStep={this.state.activeStep}*/}
              {/*  alternativeLabel*/}
              {/*  style={{background: 'none'}}*/}
              {/*  className="bg-none">*/}
              {/*  {this.getSteps().map((label, index) => (*/}
              {/*    <Step key={label}>*/}
              {/*      <StepLabel*/}
              {/*        completed={this.state.completed[index]}>*/}
              {/*        <FormattedMessage id={label}/>*/}
              {/*      </StepLabel>*/}
              {/*    </Step>*/}
              {/*  ))}*/}
              {/*</Stepper>*/}
              <div>
                {this.state.activeStep === this.getSteps().length ? (
                  <div style={{maxHeight: 600}} className="flex flex-wrap justify-center">
                    <div className="text-center h-full px-5 pt-3" style={{userSelect: 'none'}}>
                      <img src={conpletedSteps} alt="#" height={250} className='h-52'/>
                      <h2 className="text-uppercase my-4"><FormattedMessage id="Steps completed"/>
                      </h2>
                    </div>
                    <div className="col-12 mt-4 text-center">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="col-2 mb-5 px-3"
                        onClick={this.handleReset}
                      ><FormattedMessage id="Reset"/></Button>
                      <Button
                        disabled={this.state.activeStep === 0}
                        className="col-2 mb-5 mr-3 px-3 mx-3"
                        onClick={handleBack}>
                        <FormattedMessage id="Previous"/>
                      </Button>
                      <Button
                        variant="contained"
                        color={"primary"}
                        disabled={this.state.loading}
                        onClick={() => {
                          this.setState({loading: true})
                          new ReqS().createRequest({
                            ...context.state,
                            REQUEST_AUTHOR: CookieH.getUser()?.MATRICULE
                          }).then(res => {
                            setTimeout(() => {
                              this.setState({loading: false})
                            }, 1500)
                            if (res.status === 201) {
                              setTimeout(() => {
                                clearRequest()
                                context.loadRequest()
                                this.props.navigate('/archives')
                              }, 1500)
                            }
                          }, () => {
                            setTimeout(() => {
                              this.setState({loading: false})
                            }, 1500)
                          })
                        }}
                        className="col-2 mb-5 px-3">
                        {this.state.loading ?
                          <CircularProgress size={24} color="secondary"/> :
                          <FormattedMessage id="Validate"/>}
                      </Button>
                      <div className="mt-5 mx-auto" style={{maxWidth: 1000}}>
                        <h6 className="font-weight-bold text-center">
                          <div><FormattedMessage id="Request signature notification 1"/></div>
                        </h6>
                        <h4 className="font-weight-bold text-center mt-3 border-top pt-3">
                          <div><FormattedMessage id="Request signature notification 2"/></div>
                        </h4>
                        <h3 className="font-weight-bold text-center">
                          <FormattedMessage id="Request signature notification 3"/>
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="px-5 pb-3">
                      {getStepContent(this.state.activeStep)}
                    </div>
                    {this.state.activeStep !== 0 &&
                      <div className="mb-5 text-center">
                        {this.state.activeStep > 0 &&
                          <Button variant="contained" onClick={() => {
                            clearRequest()
                            this.setState({activeStep: 0})
                            // this.props.navigate('/archives')
                          }} color="secondary"><FormattedMessage id="Cancel"/></Button>}
                        <Button
                          disabled={this.state.activeStep === 0}
                          className={this.state.activeStep > 0 ? "mx-3" : "mr-3"}
                          onClick={handleBack}>
                          <FormattedMessage id="Previous"/>
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}>
                          {this.state.activeStep === this.getSteps().length - 1
                            ? <FormattedMessage id="Finish"/>
                            : <FormattedMessage id="Next"/>}
                        </Button>
                      
                      </div>}
                  </div>)}
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    );
  }
}
