import React from 'react';
import AppS from "../../../services/app.s";
import CookieH from "../../../helpers/cookie.h";
import completeApp from '../../../assets/img/complete-application.svg'
import {FormattedMessage} from "react-intl";
import {Button} from "reactstrap";
import {GlobalContext} from "../../../utilities/Global";

export default class None extends React.Component {
  
  state = {}
  
  componentDidMount() {
    new AppS().gets(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200) {
        this.setState({rowData: res.data})
      }
    })
  }
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => (
          <div className='relative h-full flex items-center justify-center flex-col'>
            <div className='text-center mt-5 pt-5'>
              <button
                className='bg-gray-400 hover:bg-gray-500 duration-300 px-4 py-2 rounded text-white shadow hover:shadow-lg active:shadow-sm'
                onClick={() => {
                context.checkForSession(CookieH.getUser()).then(res => {
                  if (res.status === 204)
                    context.setState({openSb: true, messageSb: 'No active session', severitySb: 'error'})
                  if (res.status === 200)
                    context.setState({openSb: true, messageSb: 'Session found successfully', severitySb: 'success'})
                })
              }}><FormattedMessage
                id="Check for new session"/></button>
            </div>
            <h1 className='text-center text-xl w-50 mx-auto mt-5'><FormattedMessage id="For the time being"/></h1>
            <h5 className='text-center mt-3'><FormattedMessage id="You won't be able"/></h5>
            <img src={completeApp} alt="#" height={250} className='h-96 mt-5'/>
          </div>
        )}
      </GlobalContext.Consumer>
    );
  }
}
