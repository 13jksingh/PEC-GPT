import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  Container,
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
import FlexBetween from "../components/FlexBetween";
import { useState } from "react";
import DropMenuGroup from "../components/DropMenuGroup";

const NewPart = () => {

  const {
    val: partName,
    valChange: pnameChange,
    valBlur: pnameBlur,
    valReset: pnameReset,
    valError: pnameError,
    touched: pnameTouched,
    errortext: pnameErrorText,
  } = useInput("", (val) => val.length > 0, "Enter a valid part name");

  const {
    val: MaterialComposition,
    valChange: mcChange,
    valBlur: mcBlur,
    valReset: mcReset,
    valError: mcError,
    touched: mcTouched,
    errortext: mcErrorText,
  } = useInput("", (val) => val.length > 0, "Enter a valid material composition");


  const {
    val: age,
    valChange: ageChange,
    valBlur: ageBlur,
    valReset: ageReset,
    valError: ageError,
    touched: ageTouched,
    errortext: ageErrorText,
  } = useInput("", (val) => val.length > 0, "Enter a valid age");
//Location
// Manufacturer
// Aircraft Model

const {
  val: location,
  valChange: locChange,
  valBlur: locBlur,
  valReset: locReset,
  valError: locError,
  touched: locTouched,
  errortext: locErrorText,
} = useInput("", (val) => val.length > 0, "Enter a valid age");
const {
  val: manufacturer,
  valChange: manuChange,
  valBlur: manuBlur,
  valReset: manuReset,
  valError: manuError,
  touched: manuTouched,
  errortext: manuErrorText,
} = useInput("", (val) => val.length > 0, "Enter a valid age");

const {
  val: model,
  valChange: modelChange,
  valBlur: modelBlur,
  valReset: modelReset,
  valError: modelError,
  touched: modelTouched,
  errortext: modelErrorText,
} = useInput("", (val) => val.length > 0, "Enter a valid age");


  const conditionItems = [
    { value: "New" },
    { value: "Used" },
  ];
  const [conditionValue, setconditonValue] = useState(conditionItems[0].value);
  const conditionChangeHandler = (event) => {
    setconditonValue(i => event.target.value)
  };

  const { isLoading, error, sendRequest } = usePost();

  const handleSubmit = (event) => {
    console.log("HI")
    // event.preventDefault();

    // const request = {
    //   url: `${process.env.REACT_APP_BACKEND}/api/v1/users/login`,
    //   data: {
    //     email,
    //     password,
    //   },
    // };

    // sendRequest(request).then(() => {
    //   emailReset();
    //   passwordReset();
    // });
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
              id="pname"
              label="Part Name"
              name="PartName"
              autoComplete="name"
              autoFocus
              value={partName}
              onChange={pnameChange}
              onBlur={pnameBlur}
              error={pnameError}
              helperText={pnameErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="composition"
              label="Material Composition"
              type="text"
              id="composition"
              autoComplete="current-password"
              value={MaterialComposition}
              onChange={mcChange}
              onBlur={mcBlur}
              error={mcError}
              helperText={mcErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="Age"
              autoComplete="name"
              value={age}
              onChange={ageChange}
              onBlur={ageBlur}
              error={ageError}
              helperText={ageErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="Location"
              autoComplete="name"
              value={location}
              onChange={locChange}
              onBlur={locBlur}
              error={locError}
              helperText={locErrorText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="manufacturer"
              label="Manufacturer"
              name="Manufructure"
              autoComplete="name"
              value={manufacturer}
              onChange={manuChange}
              onBlur={manuBlur}
              error={manuError}
              helperText={manuErrorText}
            />
            <DropMenuGroup
              menuValue={conditionValue}
              menuChangeHandler={conditionChangeHandler}
              menuItems={conditionItems}
              menuLabel="Condition"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN{" "}
            </Button>
            <FlexBetween>
              <Link href="forgotpass" variant="body2">
                Forgot password?
              </Link>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </FlexBetween>
            
            {error ? error : null}
            {isLoading ? <span>...Loading</span> : null}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NewPart;
