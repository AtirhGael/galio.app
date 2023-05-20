import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {FormattedMessage} from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notif({message, close, open}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="Action denied"/></DialogTitle>
        <DialogContent>
          <div id="alert-dialog-slide-description">
            <div>
              <FormattedMessage id={message}/>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
