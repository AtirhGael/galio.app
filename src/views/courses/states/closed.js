import React from 'react';
import AppS from "../../../services/app.s";
import CookieH from "../../../helpers/cookie.h";
import completeApp from '../../../assets/img/complete-application.svg'
import {FormattedMessage} from "react-intl";
import {Button} from "reactstrap";
import {GlobalContext} from "../../../utilities/Global";

export default class Closed extends React.Component {
  
  state = {}
  
  componentDidMount() {
    new AppS().gets(CookieH.getUser()?.MATRICULE).then(res => {
      if (res.status === 200)
        this.setState({rowData: res.data})
    })
  }
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => (
          <div className='relative h-full flex items-center justify-center flex-col'>
            <div className='text-center mt-5 pt-5'>
              <Button onClick={() => {
                context.checkForSession(CookieH.getUser()).then(res=>{
                  console.log(res)
                })
              }}><FormattedMessage
                id="Check for new session"/></Button>
            </div>
            <h1 className='text-center w-50 mx-auto mt-5'><FormattedMessage
              id="You now have achieved your choice session"/>
            </h1>
            <h5 className='text-center mt-3'><FormattedMessage id="You won't be able"/></h5>
            <img src={completeApp} alt="#" height={250} className='mt-5'/>
          </div>
        )}
      </GlobalContext.Consumer>
    );
  }
}
