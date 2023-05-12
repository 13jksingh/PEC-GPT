import React from "react";
import { useTheme, Box, Slider, Typography } from "@mui/material";

const SliderCustom = ({ slider, handleSliderChange, label }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingLeft: "10%",
        display: "flex",
        justifyContent: "flex-start",
        gap: "1rem",
        alignItems:"center",
        flexDirection:"column"
      }}
    >
      <Typography
        sx={{
          marginTop: "auto",
          marginBottom: "auto",
          textTransform:"uppercase",
          color:theme.palette.grey[600]
        }}
      >
        {label}
      </Typography>
      <Slider
        getAriaLabel={() => label}
        value={slider}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        small="true"
        sx={{
          width: "80%",
          marginTop: "auto",
          marginBottom: "auto",
          "& .MuiSlider-thumb": {
            color: theme.palette.green[400],
          },
          "& .MuiSlider-track": {
            color: theme.palette.green[300],
          },
          "& .MuiSlider-rail": {
            color: theme.palette.green[300],
          },
          "& .MuiSlider-active": {
            color: theme.palette.green[500],
          },
        }}
      />
    </Box>
  );
};

export default SliderCustom;
