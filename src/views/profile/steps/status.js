import React, {useContext} from 'react'
import {mdiAccountCheckOutline, mdiAccountHardHat, mdiAccountTieOutline, mdiAccountTieVoice} from '@mdi/js'
import Icon from "@mdi/react";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";

let Status = function Status() {
  const context = useContext(GlobalContext)
  const status = [
    {
      ICON: mdiAccountTieVoice,
      STATUS: 'Adminstrative',
      STATUS_TEXT: 'Adminstrative title',
      STATUS_DESC: 'Adminstrative texte'
    },
    {
      ICON: mdiAccountHardHat,
      STATUS: 'Staff',
      STATUS_TEXT: 'Staff title',
      STATUS_DESC: 'Staff texte'
    },
    {
      ICON: mdiAccountTieOutline,
      STATUS: 'Permanent',
      STATUS_TEXT: 'Permanent title',
      STATUS_DESC: 'Permanent texte'
    },
    {
      ICON: mdiAccountCheckOutline,
      STATUS: 'Vacataire',
      STATUS_TEXT: 'Lecturer title',
      STATUS_DESC: 'Lecturer texte'
    },
    {
      ICON: mdiAccountCheckOutline,
      STATUS: 'Stagiaire',
      STATUS_TEXT: 'Internship title',
      STATUS_DESC: 'Internship texte'
    }
  ]
  
  const updateStatus = (STATUS) => {
    if (!context.state.ACTIVED)
      context.updateStatus(STATUS)
  }
  
  return (
    <div className='grid max-w-screen-xl mx-auto gap-x-8 pt-5'>
      <div
        className='col-start-1 col-end-11 pb-5 px-1 md:px-5 pt-0 status-box flex justify-center items-center flex-col'>
        <h2 className='font-weight-light text-3xl max-w-md px-3 md:px-0 text-center mb-8'>
          <FormattedMessage id={'Please choose your IUC status'}/>
        </h2>
        <div
          className='grid lg:grid-cols-5 grid-cols-1 mx-auto gap-x-8 items-center justify-center mt-5 flex-wrap'>
          {status.map(stat => (
            <button
              disabled={context.state.ACTIVED}
              onClick={() => updateStatus(stat.STATUS)}
              style={{
                background: context.state.STATUS === stat.STATUS ? '#5c6ed5' : '',
                color: context.state.STATUS === stat.STATUS ? '#ffffff' : ''
              }}
              className='w-full mt-0 rounded-lg md:mt-0 shadow-xl py-8 px-4 hover:bg-blue-300 border border-gray-100 relative bg-white status-item flex flex-col justify-center items-center'>
              <Icon path={stat.ICON} size={1.8} stroke-width=".4"/>
              <div className='flex-1 mt-4'>
                <h6 className='mt-3 text-uppercase mb-2 text-black font-semibold'>
                  <FormattedMessage id={stat.STATUS_TEXT}/>
                </h6>
                <div className='px-3 text-center text-black text-xs text-opacity-40'>
                  <FormattedMessage id={stat.STATUS_DESC}/>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className='col-start-11 col-end-13 pt-5'>
        <h2 className='text-lg  mb-3'>Description</h2>
        <div className='text-black text-opacity-40'>
          <FormattedMessage id="Once in front of the menu for entering personal information"/>
          <strong><FormattedMessage id="PERMANENT, VACANT or TRAINEE"/></strong>.
          <br/>
          <br/>
          <em><strong>NB:</strong> <FormattedMessage id="If you do not know or are unsure about this information"/></em>
        </div>
      </div>
    </div>
  )
};
export default Status
