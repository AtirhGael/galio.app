import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {FormattedMessage} from "react-intl";

const MySnackbar = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={() => props.setClose()}>
            <Alert onClose={() => props.setClose()} severity={props.severiry}>
                <FormattedMessage id={props.message}/> !
            </Alert>
        </Snackbar>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default MySnackbar;
