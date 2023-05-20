import React from "react";
import Agenda from "./reactAgenda";
import {FormattedMessage} from "react-intl";
import {GlobalContext} from "../../utilities/Global";
import {Button} from "reactstrap";
import {RefreshCw} from "react-feather";
import CookieC from "../../constants/cookie.c";

export default class Plannings extends React.Component {
  
  
  loadMessage({obj, open, message, severity}) {
    let object = obj || this
    object.setState({open, message, severity})
  }
  
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          
          return (
            <div className="max-w-screen-2xl mx-auto p-12 relative shadow-2xl bg-gradient-to-r from-gray-50 bg-white rounded-xl">
              <h1 className="text-opacity-50  text-xl text-black mb-12"><FormattedMessage id="Week timetable"/></h1>
              <div className='flex items-center mb-3'>
                <span className='mr-4 flex items-center'>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: CookieC.COLOR_PLANNING.ValidatedAndBilled
                    }}
                    className='inline-block rounded mr-2'
                  /><FormattedMessage id='ValidatedAndBilled'/></span>
                <span className='mr-4 flex items-center'>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: CookieC.COLOR_PLANNING.ValidatedButNotBilled
                    }}
                    className='inline-block rounded mr-2'
                  /><FormattedMessage id='ValidatedButNotBilled'/></span>
                <span className='mr-4 flex items-center'>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: CookieC.COLOR_PLANNING.PendingValidation
                    }}
                    className='inline-block rounded mr-2'
                  /><FormattedMessage id='Pending validation'/></span>
                <span className='mr-4 flex items-center'>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: CookieC.COLOR_PLANNING.NotValidated
                    }}
                    className='inline-block rounded mr-2'
                  /><FormattedMessage id='NotValidated'/></span>
              </div>
              <div className='relative mt-2'>
                <Agenda data={context.state.planningCourses}/>
                <button
                  onClick={context.loadPlanning}
                  className='bg-blue-500 px-2.5 text-white rounded py-1.5 flex shadow-lg absolute text-uppercase'
                  style={{top: '-16px', right: '-36px'}}>
                  <RefreshCw size={16}/> &nbsp;&nbsp;<FormattedMessage id='Refresh'/>
                </button>
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>)
    
  }
}

// http://192.168.0.50:8073/api/teacher/v1/LESSONS?ApiKey=iuc3783XX19ezUNRD884296Pc&SchoolID=IUC&TeacherID=20P000825&TeacherEmail=ignacetchoumi@yahoo.com&LessonStatus=0&BeginDate=2021-03-22&EndDate=2021-03-28
