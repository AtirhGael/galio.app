import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {FormattedMessage} from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClearConfirm({open, setClose, clear}) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={setClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="Dump confirmation"/></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"><FormattedMessage id="Are you sure you want to empty your choices list ?"/></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={setClose} color="primary">
                <FormattedMessage id="NO"/>
                </Button>
                <Button onClick={() => {
                    clear()
                    setClose()
                }} color="primary">
                    <FormattedMessage id="YES"/>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
