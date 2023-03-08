// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Login from "./Login";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function SignUp() {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[3])
    console.log(e.target[3].value)
    const first_name = e.target[0].value;
    const last_name = e.target[2].value;
    const username = e.target[4].value;
    const email = e.target[6].value;
    const password = e.target[8].value;
    const confirmPassword = e.target[10].value;

    const reqBody = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }
    console.log(reqBody)

    const url = 'http://localhost:5000/signup'
    const options = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": 'application/json'
      }
    }
    if (password !== confirmPassword) {
      console.log('password does not match')
    }


    const res = await fetch(url, options);
    const success = res.status ===200
    if (success) {
      setRedirect(true)
    }

  }
  if (redirect) {
    return < Navigate replace to='/signIn'></Navigate>
  }

// export default function SignUp() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user name"
                  label="Username"

                  name="username"
                  autoComplete="username"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Comfirm password"
                  label="Comfirm Password"
                  type="password"
                  id="comfirm password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

// import React, { useState, useEffect } from "react"
// import { Navigate } from 'react-router-dom'
// import Login from "./Login";

// export default function SignUp() {
//   const [redirect, setRedirect] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(e.target)
//     console.log(e.target[0].value)
//     const first_name = e.target[0].value;
//     const last_name = e.target[1].value;
//     const email = e.target[2].value;
//     const password = e.target[3].value;
//     const confirmPassword = e.target[4].value;

//     const reqBody = {
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password: password
//     }
//     console.log(reqBody)

//     const url = 'http://localhost:5000/signup'
//     const options = {
//       method: "POST",
//       body: JSON.stringify(reqBody),
//       headers: {
//         "Content-Type": 'application/json'
//       }
//     }
//     if (password !== confirmPassword) {
//       console.log('password does not match')
//     }


//     const res = await fetch(url, options);
//     const success = res.status == 200
//     if (success) {
//       setRedirect(true)
//     }

//   }
//   if (redirect) {
//     return < Navigate replace to='/signIn'></Navigate>
//   }
//   return (
//     <div>

      
//       <div className='text-center my-5'>
//       <h1>Sign Up</h1>
//       <div className='d-flex justify-content-center text-center'>
      
//       <form className='col-4' onSubmit={handleSubmit}>
        

//         <label for="exampleInputFirstName" class="form-label">First Name</label>
//         <input type="firstName" class="form-control" id="exampleInputFirstName" aria-describedby="emailHelp"></input>
//         <label for="exampleInputLastName" class="form-label">Last Name</label>
//         <input type="lastName" class="form-control" id="exampleInputLastName" aria-describedby="emailHelp"></input>
//         <label for="exampleInputEmail1" class="form-label">Email address</label>
//         <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>


//         <div class="mb-3">
//           <label for="exampleInputPassword1" class="form-label">Password</label>
//           <input type="password" class="form-control" id="exampleInputPassword1"></input>
//           <label for="confirmPassword" class="form-label">Confirm Password</label>
//           <input type="conifrmPassword" class="form-control" id="ConfirmPassword"></input>
//         </div>

//         <button type="submit" class="btn btn-primary">Sign Up</button>
//       </form>
//     </div>
//     </div>
//     </div>

//   )
// }