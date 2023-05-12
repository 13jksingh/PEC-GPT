import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import useGet from "../../hooks/useGet";
import useSlider from "../../hooks/useSlider";
import PartCard from "../../components/PartCard";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery } from "@mui/material";
import CheckBoxGroup from "../../components/CheckBoxGroup";

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

  //setup useGet hook
  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/data`
  );

  const mobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleGet = (newdata) => {
      console.log(newdata);
      setData((i) => newdata.data);
    };

    sendRequest(handleGet);
  }, [sendRequest]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: mobile ? "column" : "row" }}>
      <Box width={mobile ? "100%" : "30%"} margin="1rem" borderShadow={2}>
        <CheckBoxGroup
          state={partName}
          setState={setPartName}
          label="PART NAME"
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
          setState={setAircraftModel}
          label="Aircraft model"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={potentialUseCases}
          setState={setPotentialUseCases}
          label="use cases"
          errorText="select alteast one"
        />
      </Box>
      <FlexBetween flexDirection="column" marginRight="1rem" width="100%">
        {data.map((item) => (
          <PartCard data={item} />
        ))}
      </FlexBetween>
    </Box>
  );
};

export default ManuCatalog;
