import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const data = {
  "Part Name": "part name",
  "Material Composition": "Aluminium",
  "Age (years)": "1",
  Condition: "used",
  Location: "india",
  Manufacturer: "aero",
  "Aircraft Model": "boeng 69",
  "Potential Use Cases": "dildo",
  "Remanufacturing Potential": "45",
  "Renewable Material Content (%)": "2",
  "Carbon Footprint Saved (kg CO2e)": "2",
  "Water Usage Saved (liters)": "21",
  "Landfill Waste Saved (kg)": "34",
  "Energy Consumption Saved (kWh)": "2",
  "Toxicity Score Difference": "4",
  "Remanufacturing Potential (%)": "3",
  "Life Cycle Assessment Score": "6",
};

const PartCard = () => {
  const cardClickHandler = () => {
    console.log("card clicked");
  };
  return (
    <Card
      sx={{
        width: "100%",
        marginLeft: "3rem",
        marginRight: "3rem",
        height: "10rem",
        marginTop:"2rem"
      }}
    >
      <CardActionArea
        onClick={cardClickHandler}
        sx={{ width: "100%", height: "100%" }}
      >
        <CardContent>
          <Grid container>
            <Grid item md={3}>
              <Typography variant="h2" gutterBottom>
                {data["Part Name"]}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="h4" component="div">
                {data["Age (years)"]}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="h4" component="div">
                {data["Manufacturer"]}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="h4" component="div">
                {data["Condition"]}
              </Typography>
            </Grid>
            <Typography variant="body1">
              Card content
              <br />
              {'"describes the content"'}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PartCard;
