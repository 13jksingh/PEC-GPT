import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import FlexBetween from "../components/FlexBetween";
import { Box, useMediaQuery, Typography, Button } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import CheckBoxGroup from "../components/CheckBoxGroup";
import usePost from "../hooks/usePost";

import DropMenuGroup from "../components/DropMenuGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

import { useAuthContext } from "../auth/authContext";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewPart = () => {
  //checkbox states
  const partNameList = {
    "Landing Gear": true,
    Engine: false,
    Avionics: false,
    Fuselage: false,
    Wing: false,
  };
  const [partName, setPartName] = useState(partNameList);

  const conditionList = {
    New: false,
    Used: true,
  };
  const [condition, setCondition] = useState(conditionList);

  const locationList = {
    Australia: true,
    "North America": true,
    Africa: true,
    "South America": true,
    Europe: true,
    Asia: true,
  };
  const [location, setLocation] = useState(locationList);

  const manufacturerList = {
    Boeing: false,
    Embraer: false,
    Bombardier: false,
    Cessna: false,
    Gulfstream: false,
    Airbus: true,
  };
  const [manufacturer, setManufacturer] = useState(manufacturerList);

  const materialCompositionList = {
    Aluminum: true,
    Titanium: false,
    Steel: false,
    Composite: false,
  };
  const [materialComposition, setMaterialComposition] = useState(
    materialCompositionList
  );

  const potentialUseCasesList = {
    Furniture: true,
    "Art Installations": false,
    "Building Materials": false,
    "Aircraft Maintenance": false,
    "Automotive Components": false,
  };
  const [potentialUseCases, setPotentialUseCases] = useState(
    potentialUseCasesList
  );

  const aircraftModelList = {
    737: true,
    "Citation X": false,
    A320: false,
    E175: false,
    G650: false,
    CRJ900: false,
  };
  const [aircraftModel, setaircraftModel] = useState(aircraftModelList);

  //slider states
  const [age, setAge] = useState(0);
  const handleAgeChange = (event, val) => setAge(val);

  //dialogue
  const [showSeeEmail, setShowSeeEmail] = useState(false);
  const mobile = useMediaQuery("(max-width:600px)");
  const { collapsed } = useProSidebar();

  const handleClose = () => {
    setShowSeeEmail(false);
  };

  const authObject = useAuthContext();
  const authToken = authObject.authState.token;

  const { isLoading, error, sendRequest } = usePost(authToken);
  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      url: `${process.env.REACT_APP_BACKEND}/api/v1/data/post-data`,
      data: {
        partName,
        materialComposition,
        age,
        location,
        condition,
        aircraftModel,
        manufacturer,
        potentialUseCases,
      },
      do: setShowSeeEmail,
    };

    sendRequest(request).then(() => {
      console.log("saved");
    });
  };

  return (
    <div>
      <Box width={mobile ? "100%" : collapsed ? "80%" : "75%"} margin="1rem">
        <CheckBoxGroup
          state={partName}
          setState={setPartName}
          label="PART NAME"
          errorText="select one"
          row="true"
          unique="true"
        />

        <CheckBoxGroup
          state={condition}
          setState={setCondition}
          label="condition"
          row="true"
          
          unique="true"
          errorText="select one"
        />
        <CheckBoxGroup
          state={materialComposition}
          setState={setMaterialComposition}
          label="MATERIAL"
          row="true"
          unique="true"
          errorText="select one"
        />
        <CheckBoxGroup
          state={location}
          setState={setLocation}
          label="LOCATION"
          row="true"
          unique="true"
          errorText="select one"
        />
        <CheckBoxGroup
          state={manufacturer}
          setState={setManufacturer}
          label="MANUFACTURER"
          row="true"
          unique="true"
          errorText="select one"
        />
        <CheckBoxGroup
          state={aircraftModel}
          setState={setaircraftModel}
          label="Aircraft model"
          row="true"
          unique="true"
          errorText="select one"
        />
        <CheckBoxGroup
          unique="true"
          state={potentialUseCases}
          setState={setPotentialUseCases}
          label="use cases"
          row="true"
          errorText="select one"
        />
        <Slider
          slider={age}
          handleSliderChange={handleAgeChange}
          label="Ageyears"
        />
      </Box>
      <Button onClick={handleSubmit}>SUBMIT</Button>
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
    </div>
  );
};

export default NewPart;
