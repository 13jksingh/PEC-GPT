import React from "react";
import { useTheme,Slider } from "@mui/material";

const SliderCustom = ({ slider, handleSliderChange, valueText }) => {
  const theme = useTheme();
  return (
    <Slider
      getAriaLabel={() => "Price Range"}
      value={slider}
      onChange={handleSliderChange}
      valueLabelDisplay="auto"
      getAriaValueText={valueText}
      sx={{
        width: "150px",
        marginTop:"auto",
        marginBottom:"auto",
        "& .MuiSlider-thumb": {
          color: theme.palette.blue[700],
        },
        "& .MuiSlider-track": {
          color: theme.palette.blue[600],
        },
        "& .MuiSlider-rail": {
          color: theme.palette.blue[400],
        },
        "& .MuiSlider-active": {
          color: theme.palette.blue[800],
        },
      }}
    />
  );
};

export default SliderCustom;