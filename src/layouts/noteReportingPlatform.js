import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import {X} from "react-feather";
import {FormattedMessage} from "react-intl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NoteReportingPlatform() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Button variant="contained" color='primary' onClick={handleClickOpen}><FormattedMessage
        id="Open note academy"/></Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <X/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <iframe
          style={{height: '100%', width: '100%'}}
          src={`https://b2i-aca-cmr-iuc.bitang.net/www004/forms/FrmLogin.aspx/embed?Provider=Google&UserEmail=ruthel.crab@gmail.com&UserScope=EnseignantAca&SchoolID=IUC&YearID=2021-2022&b2iNextUrlAfterLogin=..%2Fforms%2FFrmAcaNotes.aspx%3FPageId%3DSmenuAcaExaNotesNoms%26MenuId%3DSmenuAcaExaNotesNoms%26b2iMasterPageFile%3D~%2F__Master%2FSite.IFrame.master&output=embed`}
          frameBorder="0"/>
      </Dialog>
    </div>
  );
}
