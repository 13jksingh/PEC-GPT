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

  const conditionList = {
    New: true,
    Used: true,
  };
  const [condition, setCondition] = useState(conditionList);

  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/data`
  );
  const locationList = {
    Australia: true,
    "North America": true,
    Africa:true,
    "South America":true,
    Europe: true,
    Asia:true
  };
  const [location, setLocation] = useState(locationList);

  const manufacturerList = {
    Boeing: true,
    Embraer: true,
    Bombardier:true,
    Cessna:true,
    Gulfstream: true,
    Airbus:true
  };
  const [manufacturer, setManufacturer] = useState(manufacturerList);

  const manufacturerList = {
    Boeing: true,
    Embraer: true,
    Bombardier:true,
    Cessna:true,
    Gulfstream: true,
    Airbus:true
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

  console.log(partName);

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
          items={partNameList}
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
