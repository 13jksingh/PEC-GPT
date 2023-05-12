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
  "Condition": "used",
  "Location": "india",
  "Manufacturer": "aero",
  "Aircraft Model": "boeng 69",
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
      {/* <div style={{backgroundColor:"turquoise", width:"0.5%", display:"flex" ,height:"100%"}} />
     */}
      
      <CardActionArea
        onClick={cardClickHandler}
        sx={{ width: "100%", height: "100%" }}
        style={{borderLeft:"5px solid turquoise"}}
      >
      
        
        <CardContent>
          
          <Typography style={{ backgroundColor: "turquoise" }} variant="string" gutterBottom>
            India
          </Typography>

          <Grid container>
            <Grid item md={6}>
              <Typography style={{fontWeight:"bold"}} variant="h2" gutterBottom>
                Engine
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h3">
                12 years
              </Typography>
            </Grid>
          </Grid>


          <Grid container>
            <Grid item md={3}>
              <div>
                <Typography style={{ color: "#adacac" }} variant="p" gutterBottom>
                  Manufacturer
                </Typography>
                <br />
                <Typography style={{ fontWeight: "bold" }} variant="p" gutterBottom>
                  Boeing
                </Typography>
              </div>
            </Grid>
            <Grid item md={3}>
              <div>
                <Typography style={{ color: "#adacac" }} variant="p" gutterBottom>
                  Aircraft Model
                </Typography>
                <br />
                <Typography style={{ fontWeight: "bold" }} variant="p" gutterBottom>
                  Citation X
                </Typography>
              </div>
            </Grid>
            <Grid item md={3}>
              <div>
                <Typography style={{ color: "#adacac" }} variant="p" gutterBottom>
                  Material Composition
                </Typography>
                <br />
                <Typography style={{ fontWeight: "bold" }} variant="p" gutterBottom>
                  Aluminium
                </Typography>
              </div>
            </Grid>
          </Grid>

        </CardContent>


      </CardActionArea>
    </Card>
    
  );
};

export default PartCard;
