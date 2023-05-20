import React from "react";
import {Button} from "@material-ui/core";
import AppS from "../../../services/app.s";
import CookieH from "../../../helpers/cookie.h";
import {FormattedMessage} from "react-intl";

export default class Starting extends React.Component {

  state = {
    sesApp: {}
  }

  componentDidMount() {
    if (CookieH.getApplication())
      this.props.navigate('/sessions')
  }

  render() {
    return (
      <div className='relative flex justify-center flex-col items-center'
           style={{overflowY: 'scroll'}}>
        <h2 className='mb-4 text-uppercase font-weight-bold mt-5 pt-5' style={{textDecoration: 'underline'}}>Informations</h2>
        <div className={'col-8 mx-auto text-justify'} style={{fontSize: 24}}>
          <p style={{textIndent: 72}}>
            <FormattedMessage id="You are about to initialize your session"/>
          </p>
          <p style={{textIndent: 72}}>
            <FormattedMessage id="By accessing this section"/>
          </p>
          <p style={{textIndent: 72}}>
            <FormattedMessage
              id="Regarding day lessons"/><strong>{CookieH.getApplication()?.SubjectConstraint?.LEVEL1_J} </strong>
            <FormattedMessage
              id="Subjects lvl 12 day"/><strong>{CookieH.getApplication()?.SubjectConstraint?.LEVEL3_J} </strong>
            <FormattedMessage
              id="Subjects lvl 3 day"/><strong>{CookieH.getApplication()?.SubjectConstraint?.LEVEL4_J} </strong>
            <FormattedMessage id="Subjects lvl 45 day"/>
          </p>
          <p style={{textIndent: 72}}>
            <FormattedMessage
              id="Regarding night lessons"/><strong>{CookieH.getApplication()?.SubjectConstraint?.LEVEL1_S} </strong>
            <FormattedMessage
              id="Subjects lvl 12 night"/><strong>{CookieH.getApplication()?.SubjectConstraint?.LEVEL3_S} </strong>
            <FormattedMessage
              id="Subjects lvl 3 night"/><strong>{CookieH.getApplication()?.SubjectConstraint?.LEVEL4_S} </strong>
            <FormattedMessage id="Subjects lvl 45 night"/>
          </p>
          <hr/>
          <div className={'text-center mt-4'}>
            <Button variant={'outlined'} className={'bg-success text-white col-3'}
                    onClick={this.createApplication}><FormattedMessage id="Continue"/></Button>
          </div>
        </div>
      </div>
    )
  }

  createApplication = () => {
    new AppS().init(CookieH.getUser()?.MATRICULE, 450, CookieH.getSession()?.id, CookieH.getSession()?.SUBJECT_CONSTRAINT_ID).then(res => {
      if (res.status === 201 || res.status === 200) {
        CookieH.setApplication(res.data)
        this.props.navigate('/sessions')
      }
    })
  }
}