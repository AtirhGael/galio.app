import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import closeError from '../../assets/img/close-error.svg';
import closeSuccess from '../../assets/img/close-success.svg';
import Icon from "@mdi/react";
import {mdiFingerprint, mdiWebcam} from "@mdi/js";
import {FormattedMessage} from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

export default function InformationDialog({open, title, complement, onClose}) {
  
  const getMessageColumn = (col) => {
    return [
      {col: 'LASTEMPLOYER', text: <FormattedMessage id="Last employer missing"/>},
      {col: 'LASTJOB', text: <FormattedMessage id="Last job title missing"/>},
      {col: 'LASTJOBEND', text: <FormattedMessage id="Last job end date missing"/>},
      {col: 'LASTJOBSTART', text: <FormattedMessage id="Last job begin date missing"/>},
      {col: 'LASTJOBSTILL', text: <FormattedMessage id="Last job still missing"/>},
      {col: 'CIVILSTATUS', text: <FormattedMessage id="Civil status missing"/>},
      {col: 'SPFIRSTNAME', text: <FormattedMessage id="Spouse first name missing"/>},
      {col: 'SPLASTNAME', text: <FormattedMessage id="Spouse last name missing"/>},
      {col: 'CHILDNUM', text: <FormattedMessage id="Children number missing"/>},
      {col: 'EMERGNUM1', text: <FormattedMessage id="Emergency contact number missing"/>},
      {col: 'EMERGNAME1', text: <FormattedMessage id="Emergency contact name missing"/>},
      {col: 'LASTDIPLOMA', text: <FormattedMessage id="Last formation missing"/>},
      {col: 'LASTSPECIALTY', text: <FormattedMessage id="Formation specialization missing"/>},
      {col: 'OBTENYEAR', text: <FormattedMessage id="Diploma obtention date missing"/>},
      {col: 'OBTENESTAB', text: <FormattedMessage id="Diploma obtention establishement missing"/>},
      {col: 'NUMPHONE', text: <FormattedMessage id="Phone number 1 missing"/>},
      {col: 'NUMPHONE2', text: <FormattedMessage id="Phone number 2 missing"/>},
      {col: 'TOWN', text: <FormattedMessage id="Living town missing"/>},
      {col: 'PRECINCT', text: <FormattedMessage id="Precinct missing"/>},
      {col: 'MATRICULE', text: <FormattedMessage id="Matricule missing"/>},
      {col: 'PAYMODE', text: <FormattedMessage id="Paymode missing"/>},
      {col: 'ACCOUNT_BIRTHDATE', text: <FormattedMessage id="Account birthdate missing"/>},
      {col: 'ACCOUNT_NUM', text: <FormattedMessage id="Account number missing"/>},
      {col: 'ACTIVITY_PRINCIPAL', text: <FormattedMessage id="Principal activity missing"/>},
      {col: 'ACCOUNT_LASTNAME', text: <FormattedMessage id="Account firstname missing"/>},
      {col: 'ACCOUNT_FIRSTNAME', text: <FormattedMessage id="Account lastname missing"/>},
      {col: 'NIU', text: <FormattedMessage id="NIU missing"/>},
      //{col: 'CNPSYN', text: <FormattedMessage id="CNPSYN missing"/>},
      {col: 'IDENTIFICATION', text: <FormattedMessage id="Identification type missing"/>},
      {col: 'IDENTIFNUM', text: <FormattedMessage id="Identification number missing"/>},
      {col: 'IDENTIFPLACE', text: <FormattedMessage id="Identification place missing"/>},
      {col: 'IDENTIFSTART', text: <FormattedMessage id="Identification start missing"/>},
      {col: 'IDENTIFEND', text: <FormattedMessage id="Identification end missing"/>},
      // {col: 'DISTRICT', text: <FormattedMessage id="District missing"/>},
      // {col: 'CASHIER_CODE', text: <FormattedMessage id="Cashier code missing"/>},
      // {col: 'RIB_KEY', text: <FormattedMessage id="RIB Key missing"/>},
      {col: 'STATUS', text: <FormattedMessage id="Status missing"/>},
      {col: 'GENDER', text: <FormattedMessage id="Gender missing"/>},
      {col: 'BIRTHDATE', text: <FormattedMessage id="Birthdate missing"/>},
      {col: 'BIRTHPLACE', text: <FormattedMessage id="Birthplace missing"/>},
      {col: 'COUNTRY', text: <FormattedMessage id="Country missing"/>},
      {col: 'MAIL', text: <FormattedMessage id="Mail missing"/>},
      {col: 'CV_LINK', text: <FormattedMessage id="CV document missing"/>},
      {col: 'IDENTITY1', text: <FormattedMessage id="ID document 1 missing"/>},
      {col: 'IDENTITY2', text: <FormattedMessage id="ID document 2 missing"/>}
    
    
    ].find(e => e.col === col)?.text || col
  }
  
  
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div>
            <div className="flex align-items-start">
              <div className="mt-2">
                {complement ? <FormattedMessage id="The registration closure is impossible"/> :
                  <FormattedMessage id="You have successfully completed your registration"/>}
                {complement ? (
                  <ul className="mt-3">
                    {complement?.columns?.map(col => (
                      <li style={{color: 'red'}}
                          className="small font-weight-bold"
                      >{getMessageColumn(col)}</li>))}
                  </ul>) : (
                  <div>
                    <h6 style={{color: '#69F0AE'}}
                        className=" border py-2 mt-3 text-center mr-3 text-uppercase small font-weight-bold">
                      <FormattedMessage id="Next steps"/></h6>
                    <div className="mt-4 col-11 mx-auto text-center flex justify-between">
                      <div className="col-6">
                        <Icon path={mdiFingerprint} size={3}/>
                        <div className="mt-1 text-uppercase small"><FormattedMessage id="Fingerprint"/></div>
                      </div>
                      <div className="col-6">
                        <Icon path={mdiWebcam} size={3}/>
                        <div className="mt-1 text-uppercase small"><FormattedMessage id="Photo"/></div>
                      </div>
                    </div>
                  </div>)}
              </div>
              <img src={complement ? closeError : closeSuccess} alt="#" className="w-50"/>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            <FormattedMessage id="Close"/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
