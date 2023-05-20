import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Status from "./steps/status";
import Personnal from "./steps/personnal";
import Professional from "./steps/professional";
import Rh from "./steps/rh/rh";
import StepButton from "@material-ui/core/StepButton";
import conpletedSteps from '../../assets/img/completed.svg'
import Address from './steps/address';
import Training from './steps/training/training';
import Familial from './steps/familial';
import CookieH from "../../helpers/cookie.h";
import InformationDialog from "./closure.Info";
import {FormattedMessage} from "react-intl";
import {GlobalContext} from "../../utilities/Global";
import {CircularProgress} from "@material-ui/core";

export default class Profile extends React.Component {
  state = {
    activeStep: CookieH.getUser()?.STATUS ? 1 : 0 || 0,
    completed: {},
  }
  
  getSteps = () => {
    return ["Status", "Personal informations", "Family status", "Address and contacts", "Main activity", "Diplomas and certifications", "Legal and financial identifications"];
  }
  
  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Status
          handleNext={this.handleNext}
          state={this.state}
          setState={value => this.setState({...value})}/>;
      case 1:
        return <Personnal
          state={this.state}
          setState={value => this.setState({...value})}
        />
      case 2:
        return <Familial
          state={this.state}
          setState={value => this.setState({...value})}
        />
      case 3:
        return <Address
          state={this.state}
          setState={value => this.setState({...value})}
        />
      case 4:
        return <Professional
          state={this.state}
          setState={value => this.setState({...value})}/>
      case 5:
        return <Training
          state={this.state}
          setState={value => this.setState({...value})}/>
      case 6:
        return <Rh
          state={this.state}
          setState={value => this.setState({...value})}/>
      default:
        return 'Unknown stepIndex';
    }
  }
  
  handleNext = (context) => {
    switch (this.state.activeStep) {
      case 1:
        if (!context.state.submitePerso)
          context.updatePersonal()
        break
      case 2:
        if (!context.state.submiteFamily)
          context.updateFamilial()
        break
      case 3:
        if (!context.state.submitteAdress)
          context.updateAddress()
        break
      case 4:
        if (!context.state.submittePro)
          context.updateProfessional()
        break
      default:
        break
    }
    
    if (this.state.activeStep < this.getSteps().length - 1)
      this.setState({activeStep: (this.state.activeStep + 1)});
  }
  
  handleBack = () => {
    this.setState({activeStep: (this.state.activeStep - 1)});
  }
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div className="max-w-screen-2xl mx-auto p-12 relative shadow-2xl bg-gradient-to-r from-gray-50 bg-white rounded-xl" style={{minHeight:'78vh'}}>
              <InformationDialog
                complement={context.state.complement}
                title={context.state.title}
                open={context.state.openInfo || false}
                onClose={() => context.setState({openInfo: false})}/>
              <Stepper
                activeStep={this.state.activeStep}
                alternativeLabel
                nonLinear
                style={{background:'none'}}
                className="bg-none">
                {this.getSteps().map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={() => this.setState({activeStep: index})}
                      completed={this.state.completed[index]}>
                      <span className='hidden md:block'><FormattedMessage id={label}/></span>
                      <div style={{width: 20}} className='block md:none'/>
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {this.state.activeStep === this.getSteps().length ? (
                  <div>
                    <div className="text-center h-full px-5 pt-3">
                      <img src={conpletedSteps} alt="#" className="col-8"/>
                      <h2 className="text-uppercase mt-5"><FormattedMessage id="Steps completed"/>
                      </h2>
                    </div>
                    <Button
                      variant="contained"
                      color={"primary"}
                      className="col-3 mb-5">
                      <FormattedMessage id="Validate"/>
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="px-1 px-md-5 pb-md-5 pb-4">
                      {this.getStepContent(this.state.activeStep)}
                    </div>
                    <div className="mb-5 mt-16 text-center px-3 md:px-0">
                      <button
                        disabled={this.state.activeStep === 0}
                        className="md:mr-3 mt-2 md:mt-0 bg-blue-300 hover:bg-blue-400 px-8 rounded py-2 text-white shadow-lg disabled:bg-gray-300 disabled:border disabled:shadow-none"
                        onClick={this.handleBack}>
                        <FormattedMessage id='Previous'/>
                      </button>
                      <button
                        className="md:mr-3 mt-2 md:mt-0 mr-0 ml-md-0 bg-indigo-300 hover:bg-indigo-400 px-8 py-2 rounded text-white shadow-lg disabled:bg-gray-300 disabled:border disabled:shadow-none"
                        disabled={this.state.activeStep === this.getSteps().length - 1}
                        onClick={() => this.handleNext(context)}><FormattedMessage id='Next'/>
                      </button>
                      <button
                        disabled={context.state.ACTIVED}
                        className='mt-2 md:mt-0 bg-green-400 hover:bg-green-500  px-8 py-2 rounded text-white shadow-lg disabled:bg-gray-300 disabled:border disabled:shadow-none'
                        onClick={() => {
                          this.setState({loading: true})
                          context.handleCloseSign().then(res => {
                            this.setState({loading: false})
                          })
                        }}
                        color="secondary">
                        {this.state.loading ?
                          <CircularProgress size={22} color="secondary"/> :
                          <FormattedMessage id="Close your registration process"/>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    );
  }
}
