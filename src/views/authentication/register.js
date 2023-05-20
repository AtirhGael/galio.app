import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import {User} from "react-feather";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import logoIUC from '../../assets/img/iuc-logo.png'
import {Link} from 'react-router-dom';
import {Form} from "reactstrap";
import {FormattedMessage} from "react-intl";
import AuthS from "../../services/auth.s";
import {GlobalContext} from "../../utilities/Global";

export default class Register extends React.Component {
  state = {
    matricule: '',
  }
  
  register = (e, context) => {
    e.preventDefault()
    if (this.state.matricule.match('[0-9a-zA-Z]{8,}'))
      new AuthS().register(this.state.matricule).then(res => {
        if (res.status === 201) {
          context.setState({
            openSb: true, severitySb: 'success', messageSb: "Loggued in successfully",
            EMAIL: res.data.EMAIL,
            LASTNAME: res.data.LASTNAME,
            FIRSTNAME: res.data.FIRSTNAME,
            MATRICULE: res.data.MATRICULE,
          })
          setTimeout(() => context.navigate('/verify'), 1000)
        } else
          context.setState({openSb: true, severitySb: 'error', messageSb: "Incorrect username"})
      }, (err) => {
        console.log(err)
        if (err.status === 409)
          this.setState({
            openSb: true,
            severitySb: 'error',
            messageSb: "An account already exists"
          })
      });
    else
      this.setState({
        open: true,
        severity: 'error',
        message: "The required character number for matricule is incorrect"
      })
  };
  
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => (
          <div className="h-full w-full justify-center items-center md:flex block relative">
            <div
              className="px-0 px-md-2 h-full col-span-12 xl:col-span-7 lg:col-span-10 md:col-span-8 w-full max-w-md flex justify-center">
              <div className="flex items-center flex-row main-sign w-full">
                <div className="bg-white mb-0 py-8 w-full lg-mx-5 rounded-lg shadow-xl main-sign">
                  <div className="px-5">
                    <div>
                      <img src={logoIUC} alt={"#"}/>
                    </div>
                  </div>
                  <div className="px-5 pb-4 pt-3">
                    <Form onSubmit={(e) => this.register(e, context)} className="form h-full">
                      <FormControl
                        fullWidth
                        className="form-label-group relative has-icon-left ">
                        <InputLabel><FormattedMessage id="Matricule"/></InputLabel>
                        <Input
                          type="text"
                          endAdornment={<User size={15}/>}
                          value={this.state.matricule}
                          onChange={e => this.setState({matricule: e.target.value})}
                        />
                      </FormControl>
                      <div className='mt-6'>
                        <Button
                          className="w-full"
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={(e) => this.register(e, context)}>
                          <FormattedMessage id="Register"/>
                        </Button>
                      </div>
                      <div className="pb-3 pt-5 text-center">
                        <FormattedMessage id="Already have an account?"/>&nbsp;&nbsp;<Link to="/login"
                         className="text-blue-400 active:text-blue-500">Connectez-vous</Link>
                      </div>
                    </Form>
                  </div>
                </div>
                {/*</div>*/}
              </div>
            </div>
          </div>
        )}
      </GlobalContext.Consumer>
    );
  }
}
