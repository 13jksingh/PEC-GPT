import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  Container,
  useTheme,
  Avatar,
  Button,
  Grid,
  Box,
  TextField,
  CssBaseline,
} from "@mui/material";
import usePost from "../hooks/usePost";
import useInput from "../hooks/useInput";

import DropMenuGroup from "../components/DropMenuGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showSeeEmail, setShowSeeEmail] = useState(false);

  const handleClose = () => {
    setShowSeeEmail(false);
    navigate("/login", { replace: true });
  };

  const {
    val: firstName,
    valChange: firstNameChange,
    valBlur: firstNameBlur,
    valReset: firstNameReset,
    valError: firstNameError,
    touched: firstNameTouched,
    errortext: firstNameErrorText,
  } = useInput("", (val) => val.length > 0, "Enter your first name");

  const {
    val: lastName,
    valChange: lastNameChange,
    valBlur: lastNameBlur,
    valReset: lastNameReset,
    valError: lastNameError,
    touched: lastNameTouched,
    errortext: lastNameErrorText,
  } = useInput("", (val) => val.length > 0, "Enter your last name");

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
    "Enter a valid email"
  );

  const {
    val: password,
    valChange: passwordChange,
    valBlur: passwordBlur,
    valReset: passwordReset,
    valError: passwordError,
    touched: passwordTouched,
    errortext: passwordErrorText,
  } = useInput("", (val) => val.length > 0, "Enter a valid password");

  const { isLoading, error, sendRequest } = usePost();

  const menuItems = [
    { value: "Airline" },
    { value: "Manufacturer" },
    { value: "Recycler" },
  ];

  const [menuValue, setMenuValue] = useState(menuItems[0].value);

  const menuChangeHandler = (event) => {
    setMenuValue((i) => event.target.value);
  };

  const showDialogue = () => {
    setShowSeeEmail(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      url: `${process.env.REACT_APP_BACKEND}/api/v1/users/register`,
      data: {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        userType: menuValue,
      },
      do: showDialogue,
    };

    sendRequest(request).then(() => {
      firstNameReset();
      lastNameReset();
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              width: "20rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="first name"
              label="First Name"
              name="first name"
              autoFocus
              value={firstName}
              onChange={firstNameChange}
              onBlur={firstNameBlur}
              error={firstNameError}
              helperText={firstNameErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last name"
              label="Last Name"
              name="last name"
              value={lastName}
              onChange={lastNameChange}
              onBlur={lastNameBlur}
              error={lastNameError}
              helperText={lastNameErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <DropMenuGroup
              menuValue={menuValue}
              menuChangeHandler={menuChangeHandler}
              menuItems={menuItems}
              menuLabel="Signup As"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "20px" }}
            >
              SIGNUP{" "}
            </Button>
            <Link to="/login" variant="body2">
              Already have an account? Log In
            </Link>

            {error !== null ? (
              <Grid item xs>
                {error}
              </Grid>
            ) : null}
            {isLoading === true ? (
              <Grid item xs>
                ...Loading
              </Grid>
            ) : null}

            <div>
              <Dialog
                open={showSeeEmail}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Verification link has been sent to your email
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
