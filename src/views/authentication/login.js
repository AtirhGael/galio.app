import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import {Eye, EyeOff, User} from "react-feather";
import {CircularProgress, FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import logoIUC from '../../assets/img/iuc-logo.png'
import {Link} from 'react-router-dom';
import {Form} from "reactstrap";
import {GlobalContext} from "../../utilities/Global";
import {FormattedMessage} from "react-intl";

export default class Login extends React.Component {
  state = {
    email: '',
    matricule: '',
    severity: '',
    message: '',
    open: false,
    visible: false
  }
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div
              className="h-full w-full justify-center items-center md:flex block relative"
            >
              <div
                className="px-0 px-md-2 h-full col-12 col-xl-7 col-lg-10 col-md-8 flex justify-center">
                <div className="flex items-center flex-row main-sign">
                  <div className="bg-white mb-0 py-8 w-full lg-mx-5 rounded-lg shadow-xl main-sign">
                    <div className="px-5">
                      <div>
                        <img src={logoIUC} alt={"#"}/>
                      </div>
                    </div>
                    <div className="px-5 pb-4 pt-3">
                      <Form onSubmit={(e) => {
                        e.preventDefault()
                        context.login(this.state.email, this.state.matricule)
                      }} className="form h-full">
                        <FormControl
                          fullWidth
                          className="form-label-group relative has-icon-left">
                          <InputLabel><FormattedMessage id="Username"/></InputLabel>
                          <Input
                            type="email"
                            endAdornment={<User size={15}/>}
                            value={this.state.matricule}
                            onChange={e => this.setState({matricule: e.target.value})}
                          />
                        </FormControl>
                        <div className='mt-4'>
                          <FormControl
                            fullWidth
                            className="form-label-group relative has-icon-left">
                            <InputLabel><FormattedMessage id="Password"/></InputLabel>
                            <Input
                              type={this.state.visible ? "text" : "password"}
                              endAdornment={<div
                                className='cursor-pointer'
                                onClick={() => this.setState({visible: !this.state.visible})}>
                                {this.state.visible ? <EyeOff size={15} className='cursor-pointer'/> :
                                  <Eye size={15} className='cursor-pointer'/>}
                              </div>}
                              value={this.state.email}
                              onChange={e => this.setState({email: e.target.value})}
                            />
                          </FormControl>
                        </div>
                        <div className='mt-4'>
                          <Button
                            className="w-full"
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault()
                              this.setState({loading: true})
                              context.loginStepForSendCode(this.state.email, this.state.matricule)?.then(() => {
                                this.setState({loading: false})
                              })
                            }}>
                            {this.state.loading ?
                              <CircularProgress size={24} color="secondary"/> :
                              <FormattedMessage id="Connection"/>}
                          </Button>
                        </div>
                        <div className="py-3 text-center">
                          <FormattedMessage id="Don't have an account  yet?"/>&nbsp;&nbsp;
                          <Link
                            className="text-blue-400 active:text-blue-500"
                            to="/register"><FormattedMessage id="Register"/></Link>
                        </div>
                      </Form>
                      <div style={{maxWidth: 450}} className='mx-auto text-center mt-1'>
                        <FormattedMessage id="In case of problem send an email to"/>&nbsp;
                        <strong>numerique.educatif@myiuc.com</strong> <FormattedMessage id="by clicking"/>
                        <a href="mailto:numerique.educatif@myiuc.com" className='text-blue-400 active:text-blue-500'> <FormattedMessage id="here"/></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          )
        }}
      </GlobalContext.Consumer>
    );
  }
}
