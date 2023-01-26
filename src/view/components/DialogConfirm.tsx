import React, { FunctionComponent, ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


interface DialogConfirmInterface {
  open: boolean;
  onConfirmDialogClose?: Function;
  text?: ReactNode | string;
  loading?: boolean;
  title?: string;
  confirmBtnText?: string;
  onYesClick: Function;
}

const ConfirmationDialog: FunctionComponent<DialogConfirmInterface> = ({
  open,
  onConfirmDialogClose = () => {
  },
  text = '',
  loading = false,
  title = 'Confirmation',
  onYesClick = () => {
  },confirmBtnText,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={() => onConfirmDialogClose()}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color={'text.primary'}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color={'error'}
          onClick={() => onYesClick()}
          variant="contained">
          <>{confirmBtnText ? confirmBtnText : 'Confirmer'}</>
        </Button>
        <Button
          onClick={() => onConfirmDialogClose()}
          variant="outlined"
          color={'secondary'}
          disabled={loading}>
          <>{"Annuler"}</>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
