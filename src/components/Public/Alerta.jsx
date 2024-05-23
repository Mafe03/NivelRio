import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Alerta({ open, onClose,  severity }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        Bienvenido!
      </Alert>
    </Snackbar>
  );
}
