import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Nav from "./layouts/nav/nav";
// views
import Privacy from "./views/confidentialities/privacy";
import CodeVerifier from "./views/authentication/codeVerifier";
import Profile from "./views/profile";
import ContactUs from "./views/contactUs";
import Starting from "./views/courses/states/starting";
import Courses from "./views/courses";
import Archives from "./views/archives";
import Settings from "./views/settings";
import Plannings from "./views/plannings";
import Request from "./views/requests";
import Login from "./views/authentication/login";
import Register from "./views/authentication/register";
import EmailVerifier from "./views/authentication/emailVerifier";
import EmailConfirmer from "./views/authentication/emailConfirmer";
import EmailVerifierMail from "./views/authentication/emailVerifierMail";
import Terms from "./views/confidentialities/terms";

const Router = () => (
  <Routes>
    <Route path='/' element={<Nav/>}>
      <Route index element={<Profile/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path="/courses/help" element={<Starting/>}/>
      <Route path="/archives" element={<Archives/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/planning" element={<Plannings/>}/>
      <Route path="/requests" element={<Request/>}/>
    </Route>
    
    <Route path="/login" element={<Login/>}/>
    <Route path="/verification-code" element={<CodeVerifier/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/verify" element={<EmailVerifier/>}/>
    <Route path="/email-confirmation" element={<EmailConfirmer/>}/>
    <Route path="/mail-sent" element={<EmailVerifierMail/>}/>
    <Route path="/terms-of-use" element={<Terms/>}/>
    <Route path="/privacy-policy" element={<Privacy/>}/>
  </Routes>
);
export default Router
