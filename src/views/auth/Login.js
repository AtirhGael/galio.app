import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import {Eye, EyeOff, User} from "react-feather";
import {CircularProgress, FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import logoIUC from '../../assets/img/iuc-logo.png'
import {Link} from 'react-router-dom';
import {Form} from "reactstrap";
import {FormattedMessage} from "react-intl";

const Login = () => {
  const [email, setEmail] = useState('');
  const [matricule, setMatricule] = useState('');
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
                    <Form 
                    className="form h-full">
                      <FormControl
                        fullWidth
                        className="form-label-group relative has-icon-left">
                        <InputLabel><FormattedMessage id="Username"/></InputLabel>
                        <Input
                          type="email"
                          endAdornment={<User size={15}/>}
                          value={matricule}
                          onChange={e => setMatricule(e.target.value)}
                        />
                      </FormControl>
                      <div className='mt-4'>
                        <FormControl
                          fullWidth
                          className="form-label-group relative has-icon-left">
                          <InputLabel><FormattedMessage id="Password"/></InputLabel>
                          <Input
                            type={visible ? "text" : "password"}
                            endAdornment={<div
                              className='cursor-pointer'
                              onClick={() => setVisible(!visible)}>
                              {visible ? <EyeOff size={15} className='cursor-pointer'/> :
                                <Eye size={15} className='cursor-pointer'/>}
                            </div>}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </FormControl>
                      </div>
                      <div className='mt-4'>
                        <Button
                          className="w-full"
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={(e) =>console.log("clicked")}>
                          {loading ?
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
    }

export default Login;
