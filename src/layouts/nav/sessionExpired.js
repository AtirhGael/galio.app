import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import sessionExpired from '../../assets/img/sessionExpired.png';
import {FormattedMessage} from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SessionExpired({open, handleClose}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div id="alert-dialog-slide-title">
          <h3 className='text-center mt-3'><FormattedMessage id="Session time expired"/></h3>
        </div>
        <DialogContent className='text-center'>
          <img src={sessionExpired} alt="#"/>
          <p id="alert-dialog-slide-description" style={{fontSize: '1.5em'}}>
            <FormattedMessage id="Your session time has been expired"/>
          </p>
        </DialogContent>
        <DialogActions className={'text-center'}>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
