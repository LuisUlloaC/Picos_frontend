import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function ErrorAlert({errorBody}) {
  return (
    <Stack sx={{ 
        display: 'flex',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        right: '0',
     }}>
      <Alert severity="error">
        {errorBody}
      </Alert>
    </Stack>
  );
}