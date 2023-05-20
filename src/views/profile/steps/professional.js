import React from "react";
import Icon from "@mdi/react";
import {mdiFileDocumentEditOutline, mdiUnicode} from "@mdi/js";
import IOSSwitch from "../../../components/switchButton";
import {Grid} from "@material-ui/core";
import {Save} from "react-feather";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import GInput from "../../../components/gInput";

export default class Professional extends React.Component {
  
  render() {
    const titles = [
      'Docteur'
    ]
    const grades = [
      {key: 'Dr', value: 'Doctor'},
      {key: 'Pr', value: 'Professor'},
      {key: 'Pro', value: 'Professional'},
      {key: 'Pro', value: 'Simple teacher'},
      {key: 'CC', value: 'Charge de cours'},
      {key: 'MC', value: 'Maitre de conference'},
      {key: 'Ass.', value: 'Assistant'},
      {key: 'Other', value: 'Other'},
    ]
    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div className='grid max-w-screen-lg mx-auto gap-x-8 pt-5'>
              <form onSubmit={(e) => {
                e.preventDefault()
                context.updateProfessional()
              }} className='text-left col-start-1 col-end-10'>
                <div className="md:flex flex-row-reverse justify-end block items-center">
                  <h5 className='mt-3 flex items-start mr-1 px-0'>
                                    <span className='hidden md:inline mr-2'><Icon path={mdiFileDocumentEditOutline}
                                                                                  size={1}/>&nbsp;&nbsp;</span>
                    <span className='mr-2'><FormattedMessage id={'Academic classification'}/></span>
                  </h5>
                </div>
                <Grid container spacing={3} className="md:flex hidden">
                  <Grid item xs={3}>
                    <GInput
                      id='Organization'
                      value={context.state.org2}
                      disabled
                      label='Organization'
                      hint=' '
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <GInput
                      id='Direction'
                      value={context.state.org2}
                      disabled
                      label='Direction'
                      hint=' '
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <GInput
                      id='Department'
                      value={context.state.org3}
                      disabled
                      label='Department'
                      hint=' '
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <GInput
                      id='Service'
                      value={context.state.org4}
                      disabled
                      label='Service'
                      hint=' '
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <div className="flex mt-2 items-center">
                      <span className='text-black-50 mr-2'><FormattedMessage id="Lecturer Y/N"/></span>
                      <IOSSwitch
                        disabled={true}
                        checked={context.state.lecturer}
                      />
                    </div>
                  </Grid>
                </Grid>
                <div className="md:flex flex-row-reverse justify-end block items-center mt-5">
                  <div className='md:inline text-right text-md-left'>
                    <button
                      type="submit"
                      disabled={context.state.submittePro}
                      color={context.state.submittePro ? 'default' : 'primary'}
                      className='bg-white p-2 rounded-full border border-green-300 shadow-lg mb-2.5 disabled:shadow-none disabled:bg-gray-300 hover:bg-gray-50 cursor-pointer disabled:cursor-auto transition-all'
                    >
                      <Save size={20} strokeWidth={1} color='green'/>
                    </button>
                  </div>
                  <h5 className='mt-3 mb-3 flex items-start mr-1 px-0'>
                                    <span className='hidden md:inline mr-2'><Icon path={mdiUnicode}
                                                                                  size={1}/>&nbsp;&nbsp;</span>
                    <span className='mr-2'><FormattedMessage id={'Main activity'}/></span>
                  </h5>
                </div>
                <Grid container spacing={3} className="pt-3">
                  <Grid item xs={4}>
                    <GInput
                      id='Job Title'
                      value={context.state.SPECIALITY}
                      label='Specialite'
                      hint=' '
                      onChange={e => {
                        context.setState({SPECIALITY: e.target.value})
                        if (context.state.submittePro)
                          context.setState({submittePro: false})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className='-mt-1'>
                      <label id="demo-simple-select-label"><FormattedMessage id={'Title'}/></label>
                      <select
                        className='w-full py-2 disabled:bg-gray-100 px-2 bg-white rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                        value={context.state.TITLE}
                        disabled={context.state.ACTIVED}
                        onChange={e => {
                          context.setState({TITLE: e.target.value})
                          if (context.state.submittePro)
                            context.setState({submittePro: false})
                        }}
                      >
                        <option disabled selected>Select a title</option>
                        <option key="master">Maître</option>
                        <option key="doctor">Docteur</option>
                        <option key="conference master">Maître de conférences</option>
                        <option key="professorSPECIALITY">Professeur des universités</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className='-mt-1'>
                      <label id="demo-simple-select-label"><FormattedMessage id={'Grades'}/></label>
                      <select
                        className='w-full py-2 disabled:bg-gray-100 px-2 bg-white rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                        value={context.state.GRADES}
                        disabled={context.state.ACTIVED}
                        onChange={e => {
                          context.setState({GRADES: e.target.value})
                          if (context.state.submittePro)
                            context.setState({submittePro: false})
                        }}
                      >
                        <option disabled selected>Select a grade</option>
                        {grades.map(gender => <option value={gender.key} key={gender.key}>{gender.value}</option>)}
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className='-mt-1'>
                      <label id="demo-simple-select-label"><FormattedMessage id={'Main activity'}/></label>
                      <select
                        className='w-full py-2 disabled:bg-gray-100 px-2 bg-white rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                        value={context.state.ACTIVITY_PRINCIPAL}
                        disabled={context.state.ACTIVED}
                        onChange={e => {
                          context.setState({ACTIVITY_PRINCIPAL: e.target.value})
                          if (context.state.submittePro)
                            context.setState({submittePro: false})
                        }}
                      >
                        <option value='employee'>Employee in a third party company</option>
                        <option value='officer'>Civil servant</option>
                        <option value='independent'>Self employed</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <GInput
                      id='LastJob'
                      value={context.state.LASTJOB}
                      disabled={context.state.ACTIVED}
                      label='Last Job'
                      hint=' '
                      onChange={e => {
                        context.setState({LASTJOB: e.target.value})
                        if (context.state.submittePro)
                          context.setState({submittePro: false})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <GInput
                      id='Lastemployer'
                      value={context.state.LASTEMPLOYER}
                      disabled={context.state.ACTIVED}
                      label='Last employer'
                      hint=' '
                      onChange={e => {
                        context.setState({LASTEMPLOYER: e.target.value})
                        if (context.state.submittePro)
                          context.setState({submittePro: false})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <GInput
                      type='date'
                      id='LASTJOBSTART'
                      value={context.state.LASTJOBSTART}
                      disabled={context.state.ACTIVED}
                      label='Start date'
                      hint=' '
                      onChange={e => {
                        context.setState({LASTJOBSTART: e.target.value})
                        if (context.state.submittePro)
                          context.setState({submittePro: false})
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <GInput
                      type='date'
                      id='LASTJOBSTILL'
                      value={context.state.LASTJOBSTILL}
                      disabled={context.state.ACTIVED && context.state.LASTJOBSTILL}
                      label='Start date'
                      hint=' '
                      onChange={(e) => {
                        context.setState({LASTJOBEND: e.target.value})
                        if (context.state.submittePro)
                          context.setState({submittePro: false})
                      }}
                    />
                    <div className="flex items-center mt-4 mt-md-2">
                                        <span
                                          className='text-black-50 mr-2'><FormattedMessage
                                          id="Current activity?"/></span>
                      <IOSSwitch
                        checked={context.state.LASTJOBSTILL}
                        disabled={context.state.ACTIVED}
                        onChange={e => {
                          context.setState({LASTJOBSTILL: e.target.checked})
                          if (e.target.checked)
                            context.setState({LASTJOBEND: null})
                          if (context.state.submittePro)
                            context.setState({submittePro: false})
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </form>
              <div className='col-start-10 col-end-13 pt-5'>
                <h2 className='text-lg  mb-3'>Description</h2>
                <div className='text-black text-opacity-40'>il s’agit simplement de renseigner et oindre des
                  ustificatifs à chaque emploi, diplôme, formation
                  certification, ou tout autre acquis que vous souhaiteriez renseigner... Des métadonnées, par souci
                  minimum de classification, sont demandés pour chaque fichier comme sur l’exemple de l’image cidessous.
                </div>
              </div>
            </div>
          )
        }}</GlobalContext.Consumer>
    )
  }
}
