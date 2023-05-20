import React, { useState, useEffect, useContext, memo } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { User } from "react-feather";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import logoIUC from "../../assets/img/iuc-logo.png";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import { FormattedMessage } from "react-intl";
import AuthS from "../../services/auth.s";
import { GlobalContext } from "../../utilities/Global";
import {Eye, EyeOff} from "react-feather";


const url = 'http://localhost:5000'

const Register = memo(() => {
  const [input, setInput] = useState({
    password:'',
    email:'',
    name:'',
  })
 
  const  {password, email, name} = input;

 const [visible, setVisible] = useState(false);

 const onchange= e =>{
  setInput({...input,[e.target.name]: e.target.value})
 }

 const submitForm =async(e)=>{
  e.preventDefault()
  try {
    const body = {email,name,password}
    const response = await fetch('http://localhost:5000/auth/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      })
    const perseRes = await response.json()
    console.log(perseRes);
    // localStorage.setItem("token",perseRes.token)
  } catch (error) {
    console.log(error);
  }
 }

  return (
    <div className="h-full w-full justify-center items-center md:flex block relative">
      <div className="px-0 px-md-2 h-full col-span-12 xl:col-span-7 lg:col-span-10 md:col-span-8 w-full max-w-md flex justify-center">
        <div className="flex items-center flex-row main-sign w-full">
          <div className="bg-white mb-0 py-8 w-full lg-mx-5 rounded-lg shadow-xl main-sign">
            <div className="px-5">
              <div>
                <img src={logoIUC} alt={"#"} />
              </div>
            </div>
            <div className="px-5 pb-4 pt-3">
              <Form  className="form h-full" onSubmit={submitForm}>
                <FormControl
                  fullWidth
                  className="form-label-group relative has-icon-left "
                >
                  <InputLabel>
                    <FormattedMessage id="name" />
                  </InputLabel>
                  <Input
                    type="text"
                    name='name'
                    // value={name}
                    onchange={onchange}
                    endAdornment={<User size={15} />}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  className="form-label-group relative has-icon-left "
                >
                  <InputLabel>
                    <FormattedMessage id="email" />
                  </InputLabel>
                  <Input
                    type="email"
                    endAdornment={<User size={15} />}
                    onchange={onchange}
                    name='email'
                  />
                </FormControl>
                <FormControl
                fullWidth
                className="form-label-group relative has-icon-left">
                <InputLabel><FormattedMessage id="Password"/></InputLabel>
                <Input
                  type={visible ? "text" : "password"}
                  name='password'
                  onchange={onchange}
                  endAdornment={<div
                    className='cursor-pointer'
                    onClick={() => setVisible(!visible)}>
                    {visible ? <EyeOff size={15} className='cursor-pointer'/> :
                      <Eye size={15} className='cursor-pointer'/>}
                  </div>}
                  
                  
                />
              </FormControl>
                <div className="mt-6">
                  <Button
                    className="w-full"
                    variant="contained"
                    color="primary"
                    type="submit"
                    
                  >
                    <FormattedMessage id="Register" />
                  </Button>
                </div>
                <div className="pb-3 pt-5 text-center">
                  <FormattedMessage id="Already have an account?" />
                  &nbsp;&nbsp;
                  <Link
                    to="/login"
                    className="text-blue-400 active:text-blue-500"
                  >
                    Connectez-vous
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Register;
