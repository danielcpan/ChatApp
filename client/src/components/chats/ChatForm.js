import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import UserField from './UserField';

export default function ChatForm(props) {
  const { isFormOpen, handleClose } = props;

  return (
    <div>
      <Dialog fullWidth={true} open={isFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Chat And Send To: </DialogTitle>
        <DialogContent style={{ height: '190px' }}>
          <UserField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
