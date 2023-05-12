import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import useGet from "../../hooks/useGet";
import useSlider from "../../hooks/useSlider";
import PartCard from "../../components/PartCard.js";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery } from "@mui/material";

const ManuCatalog = () => {
  const [data, setData] = useState([]);
  const { isLoading, error, sendRequest } = useGet(`url`);

  const mobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleGet = (newdata) => {
      console.log(newdata);
      setData((i) => newdata);
    };

    sendRequest(handleGet);
  }, [sendRequest]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const partCards = data.forEach((item) => <PartCard data={item} />);

  return (
    <Box sx={{ display: "flex", flexDirection: mobile ? "row" : "column" }}>
      <FlexBetween width={mobile ? "100%" : "20%"} backgroundColor="black"></FlexBetween>
      <FlexBetween>{partCards}</FlexBetween>
    </Box>
  );
};

export default ManuCatalog;
