import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './signIn.module.css';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import axios from 'axios';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    axios
      .post('https://connections-api.herokuapp.com/users/login', {
        email: data.get('email'),
        password: data.get('password'),
      })
      .then((response) => {
        // Assuming the API response includes the authenticated user information and token
        const { user, token } = response.data;
        // Dispatch the login action to store the user information and token in the Redux store
        dispatch(login({ user, token }));
        // Redirect the user to the desired page (e.g., contact list)
        navigate('/contacts');
      })
      .catch((error) => {
        // Handle authentication errors
        console.log('Authentication Error:', error);
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" className={styles.container}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={styles.background} />
        <Grid item xs={12} sm={8} md={5} component={Container} maxWidth="xs" square>
          <Box className={styles.content}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={styles.title}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} className={styles.form}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" className={styles.submitButton}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                  Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
