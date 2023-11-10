import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/provider';
import colors from '../../colors';


export default function SignInSide() {
  let navigate = useNavigate();
  const {state , setState} = React.useContext(Context)
  const [wrongCredentials, setWrongCredentials] = React.useState(false)

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email') === 'admin' && data.get('password') === 'admin'){
      setState({...state, 'user': data.get('email'), 'isAdmin': true})
      navigate('/home')
    } else {
        setWrongCredentials(true)
    }
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100cqw',
            height: '100vh',
            background: 'linear-gradient(250deg, green, #ffdd99)',
            backgroundSize: '200% 200%',
            animation: 'gradientAnimation 6s ease infinite',
          }}
        >
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{alignSelf: 'center'}}>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: colors.primaryBackground }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    error={wrongCredentials}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Usuario"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    error={wrongCredentials}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , backgroundColor: colors.primaryBackground}}
                >
                    Iniciar Sesión
                </Button>
                </Box>
            </Box>
            </Grid>  
        </Grid>
      </Grid>
  );
}