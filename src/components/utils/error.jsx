import { Alert } from '@mui/material';

export default function ErrorComponent({errorMessage}) {
 return (
  <div style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '20px',
  }}>
    <Alert name='amount' severity="error">{errorMessage}</Alert>
  </div>
 );
}
