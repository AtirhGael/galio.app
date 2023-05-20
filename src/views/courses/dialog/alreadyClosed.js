import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlreadyClosed({open, setClose, clear}) {
    const navigate = useNavigate();
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title"><FormattedMessage id="Action denied"/></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"><FormattedMessage id="Unable to load data"/></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{
                    setClose()
                    navigate('/archives')

                }} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
