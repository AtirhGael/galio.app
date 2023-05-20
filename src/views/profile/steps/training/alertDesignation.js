import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export default function AlertDesignation({open, setClose}) {

  return (
    <Dialog
      open={open}
      onClose={setClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Action impossible
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          les caratères comme <strong>"/"</strong> ne sont pas autorisés dans le renseignement des informations de vos
          differents diplomes. concernant l'intitulé et le nom de spécialité
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={setClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
