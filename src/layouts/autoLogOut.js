import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import FormatH from "../helpers/format.h";
import timeOut from './../assets/img/time-out.png'

export default function AutoLogOut({open, handleCancel, handleClose}) {
  const [counter, setCounter] = useState(20)
  useEffect(() => {
    if (counter === 0)
      handleClose()
    else
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])
  
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id={"Timeout activity"}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='text-center'>
            <img src={timeOut} alt="" width={300}/>
            <div>
              <FormattedMessage
                id='Due to an expired inactivity period of your account, your session will be temporarily closed. Do you want to keep your activity?'/>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='text-center w-full'>
            <div style={{maxWidth: 300}} className='mx-auto flex mb-4'>
              <Button onClick={handleCancel} className='bg-success text-white mx-1' style={{width: 150}}>&nbsp;&nbsp;
                <FormattedMessage
                  id={'Stay'}/>&nbsp;&nbsp; </Button>
              <Button onClick={handleClose} autoFocus className='bg-danger text-white mx-1' style={{width: 150}}>
                &nbsp;&nbsp;<FormattedMessage id={'Close'}/> [{FormatH?.number(counter) || '00'}]&nbsp;&nbsp;
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
