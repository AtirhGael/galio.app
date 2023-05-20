import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import {Mail, User} from "react-feather";
import {CircularProgress, FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import logoIUC from '../../assets/img/iuc-logo.png'
import {Form} from "reactstrap";
import {FormattedMessage} from "react-intl";
import AuthS from "../../services/auth.s";
import {GlobalContext} from "../../utilities/Global";

export default function EmailVerifier() {
  const context = useContext(GlobalContext)
  
  const verify = e => {
    e.preventDefault()
    context.setState({loading: true})
    if (context.state.EMAIL.match('^[a-zA-Z][a-zA-Z0-9.-_]{1,}@[a-zA-Z][a-zA-Z0-9]{1,}.[a-zA-Z]{2,}'))
      new AuthS().verifyEmail(context.state.EMAIL, context.state.MATRICULE).then(res => {
        if (res.status === 200) {
          context.navigate('mail-sent')
        }
      }, err => {
        context.setState({
          open: true,
          severity: 'error',
          message: "An error has occured during the process"
        })
      });
    else
      context.setState({
        open: true,
        severity: 'error',
        message: "The adress format is incorrect"
      })
  };
  
  return (
    <div className="h-full w-full justify-center items-center md:grid block relative">
      <div
        className="px-0 px-md-2 h-full col-span-12 xl:col-span-7 lg:col-span-10 md:col-span-8 w-full max-w-md flex justify-center">
        <div className="flex flex-col justify-center items-center flex-row main-sign w-full">
          <div className="bg-white mb-0 py-8 w-full lg-mx-5 px-5 rounded-lg shadow-xl main-sign text-center text-xs">
            <FormattedMessage id="Welcome on GALIO"/>
          </div>
          <div className='bg-white mb-0 py-8 w-full lg-mx-5 px-5 rounded-lg shadow-xl main-sign mt-5'>
            <div className="px-5 pb-4 pt-3">
              <div className="">
                <div>
                  <img src={logoIUC} alt={"#"}/>
                </div>
              </div>
              <div className="">
                <div className="text-black-50 mb-1"><FormattedMessage id="Employee name"/></div>
                <h3 className='flex text-xl whitespace-nowrap mb-3'>
                  <User size={28}/>&nbsp;&nbsp;{context.state.LASTNAME} {context.state.FIRSTNAME}
                </h3>
                <Form onSubmit={verify} className="form mt-3 ">
                  <FormControl
                    fullWidth
                    className="form-label-group relative has-icon-left ">
                    <InputLabel><FormattedMessage id="Email address"/></InputLabel>
                    <Input
                      type='email'
                      endAdornment={<Mail size={15}/>}
                      value={context.state.EMAIL}
                      onChange={e => context.setState({EMAIL: e.target.value})}
                    />
                  </FormControl>
                  <div className='mt-5'>
                    <Button
                      className="w-full mt-4"
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={verify}>
                      {context.state.loading ?
                        <CircularProgress size={24} color="secondary"/> : <FormattedMessage id="Send mail"/>}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
