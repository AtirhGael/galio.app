import React from 'react';
import GoogleLogin from 'react-google-login';
import EmployeeS from "../../services/employees.s";
import {GlobalContext} from "../../utilities/Global";
import CookieH from "../../helpers/cookie.h";
import Button from "@material-ui/core/Button";
import {FormattedMessage} from "react-intl";
// or
// import { GoogleLogin } from 'react-google-login';


const OAuth2 = () => {
  return <GlobalContext.Consumer>
    {context => {
      
      const responseGoogle = (response) => {
        if (response?.profileObj?.email) {
          new EmployeeS().setGmailAccount(CookieH.getUser()?.MATRICULE, response.profileObj.email).then(res => {
            if (res.status === 200) {
              context.setState({GMAIL_ACCOUNT: response.profileObj.email})
              CookieH.setUser({...CookieH.getUser(), GMAIL_ACCOUNT: response.profileObj.email})
            }
          }, err => {
            if (err.status === 409)
              context.setState({openSb: true, severitySb: 'error', message: 'Gmail account already in use'})
          })
        }
      }
      
      return <div>
        {
          context.state.GMAIL_ACCOUNT ? <Button color='primary' variant='contained'
                                                onClick={() => window.open(`https://b2i-aca-cmr-iuc.bitang.net/www004/forms/FrmLogin.aspx?Provider=Google&UserEmail=${context.state.GMAIL_ACCOUNT}&UserScope=EnseignantAca&SchoolID=IUC&YearID=2021-2022&b2iNextUrlAfterLogin=..%2Fforms%2FFrmAcaNotes.aspx%3FPageId%3DSmenuAcaExaNotesNoms%26MenuId%3DSmenuAcaExaNotesNoms`, '_blank')}><FormattedMessage
            id="Open note academy"/></Button> : <GoogleLogin
            clientId="1012422682564-m12ussqnlfe0utian870rrti76l4hv6l.apps.googleusercontent.com"
            buttonText={context.state.GMAIL_ACCOUNT ? context.state.GMAIL_ACCOUNT : <FormattedMessage id="Link gmail"/>}
            onSuccess={responseGoogle}
            disabled={context.state.GMAIL_ACCOUNT}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        }
      </div>
    }}
  </GlobalContext.Consumer>
};

export default OAuth2;
