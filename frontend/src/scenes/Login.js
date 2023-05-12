import { useState } from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  Container,
  useTheme,
  Avatar,
  Button,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
} from "@mui/material";
import usePost from "../hooks/usePost";
import useInput from "../hooks/useInput";
import { useAuthContext } from "../auth/authContext";

const Login = () => {
  const theme = useTheme();
  const authObject=useAuthContext();
  const setToken=authObject.loginHandler;

  const {
    val: email,
    valChange: emailChange,
    valBlur: emailBlur,
    valReset: emailReset,
    valError: emailError,
    touched: emailTouched,
    errortext: emailErrorText,
  } = useInput(
    "",
    (val) => val.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    "enter a valid email"
  );

  const {
    val: password,
    valChange: passwordChange,
    valBlur: passwordBlur,
    valReset: passwordReset,
    valError: passwordError,
    touched: passwordTouched,
    errortext: passwordErrorText,
  } = useInput("", (val) => val.length > 0, "size >0");

  const { isLoading, error, sendRequest } = usePost();

  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      url: `${process.env.REACT_APP_BACKEND}/api/v1/users/login`,
      data: {
        email,
        password,
      },
      do: setToken,
    };

    sendRequest(request).then(() => {
      emailReset();
      passwordReset();
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor="white"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={emailChange}
              onBlur={emailBlur}
              error={emailError}
              helperText={emailErrorText}
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
              value={password}
              onChange={passwordChange}
              onBlur={passwordBlur}
              error={passwordError}
              helperText={passwordErrorText}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN{" "}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="forgotpass" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              {error &
              (
                <Grid item xs>
                  {error}
                </Grid>
              )}
              {isLoading &
              (
                <Grid item xs>
                  ...Loading
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </Box>
  );
};

export default Login;