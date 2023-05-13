import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import useGet from "../../hooks/useGet";
import PartCard from "../../components/PartCard";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import CheckBoxGroup from "../../components/CheckBoxGroup";
import Loading from "../Loading";

const ManuCatalog = () => {
  const [data, setData] = useState([]);

  //checkbox states
  const partNameList = {
    "Landing Gear": true,
    Engine: true,
    Avionics: true,
    Fuselage: true,
    Wing: true,
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
    Titanium: true,
    Steel: true,
    Composite: true,
  };
  const [materialComposition, setMaterialComposition] = useState(
    materialCompositionList
  );

  const potentialUseCasesList = {
    Furniture: true,
    "Art Installations": true,
    "Building Materials": true,
    "Aircraft Maintenance": true,
    "Automotive Components": true,
  };
  const [potentialUseCases, setPotentialUseCases] = useState(
    potentialUseCasesList
  );

  const aircraftModelList = {
    737: true,
    "Citation X": true,
    A320: true,
    E175: true,
    G650: true,
    CRJ900: true,
  };
  const [aircraftModel, setaircraftModel] = useState(aircraftModelList);

  //slider states
  const [Ageyears, setAgeyears] = useState([0, 200]);
  const handleAgeyearsChange = (event, val) => setAgeyears(val);

  const [page, setPage] = useState(1);
  //setup useGet hook
  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/data?page=${page}`
  );
  const mobile = useMediaQuery("(max-width:600px)");

  //useEffect for making the fetch call to the backend
  useEffect(() => {
    const handleGet = (newdata) => {
      //console.log(newdata);
      setData((i) => newdata.data);
    };

    sendRequest(handleGet);
  }, [sendRequest]);

  //close sidebar on loading this page
  const { collapseSidebar, collapsed } = useProSidebar();
  useEffect(() => {
    collapseSidebar();
  }, [collapseSidebar]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h5" color="error">
          Failed to load.
        </Typography>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: mobile ? "column" : "row" }}>
      <Box
        width={mobile ? "100%" : collapsed ? "20%" : "15%"}
        margin="1rem"
        sx={{ height: "50rem", overflow: "hidden", overflowY: "scroll" }}
      >
        <CheckBoxGroup
          state={partName}
          setState={setPartName}
          label="PART NAME"
          errorText="select alteast one"
        />

        <CheckBoxGroup
          state={condition}
          setState={setCondition}
          label="condition"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={materialComposition}
          setState={setMaterialComposition}
          label="MATERIAL"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={location}
          setState={setLocation}
          label="LOCATION"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={manufacturer}
          setState={setManufacturer}
          label="MANUFACTURER"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={aircraftModel}
          setState={setaircraftModel}
          label="Aircraft model"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={potentialUseCases}
          setState={setPotentialUseCases}
          label="use cases"
          errorText="select alteast one"
        />
        <Slider
          slider={Ageyears}
          handleSliderChange={handleAgeyearsChange}
          label="Ageyears"
        />
      </Box>
      <FlexBetween
        flexDirection="column"
        marginRight="1rem"
        width="100%"
        marginBottom="2rem"
      >
        {data.map((item, indx) => (
          <PartCard data={item} key={indx} />
        ))}
        <FlexBetween sx={{ marginTop: "10px" }}>
          {page > 1 && (
            <span onClick={() => setPage((i) => i - 1)}>PREV</span>
          )}
          <Typography style={{ marginLeft: "5px", marginRight: "5px" }}>
            -
          </Typography>
          <span onClick={() => setPage((i) => i + 1)}>NEXT</span>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default ManuCatalog;
