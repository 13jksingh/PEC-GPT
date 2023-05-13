import React, { useState } from "react";
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import { useAuthContext } from "../auth/authContext";

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

const SettingsPage = () => {
  const [isNameChangeOpen, setIsNameChangeOpen] = useState(true);
  const [isUserTypeChangeOpen, setIsUserTypeChangeOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChangeClick = () => {
    setIsNameChangeOpen(!isNameChangeOpen);
  };

  const handlePasswordChangeClick = () => {
    setIsUserTypeChangeOpen(!isUserTypeChangeOpen);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const authObject = useAuthContext();
  const authToken = authObject.authState.token;

  //dialogue
  const [showDialogue, setShowDialogue] = useState(false);

  const handleClose = () => {
    setShowDialogue(false);
  };

  const handleSaveName = () => {
    // Simulate API call
    fetch("http://localhost:8000/api/v1/settings/change-username", {
      method: "POST",
      body: JSON.stringify({
        new_first_name: firstName,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setShowDialogue(data.message))
      .catch((data) => setShowDialogue(data.message));
  };

  const handleChangeUserType = () => {
    // Simulate API call
    if (newPassword === confirmPassword) {
      fetch("http://localhost:8000/api/v1/settings/change-usertype", {
        method: "POST",
        body: JSON.stringify({
          new_user_type: newPassword,
          password:confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      })
        .then((response) => response.json())
        .then((data) => setShowDialogue(data.message))
        .catch((data) => setShowDialogue(data.message));
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div>
      <form>
        <List>
          <ListItem button onClick={handleNameChangeClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Change First Name" />
          </ListItem>
          <Collapse in={isNameChangeOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </ListItem>
              <ListItem>
                <Button onSubmit={handleSaveName}>Save</Button>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handlePasswordChangeClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Change User Type" />
          </ListItem>
          <Collapse in={isUserTypeChangeOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <TextField
                  label="New User Type"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </ListItem>
              <ListItem>
                <Button onSubmit={handleChangeUserType}>Save</Button>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </form>
      <div>
        <Dialog
          open={showDialogue ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {showDialogue}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SettingsPage;
