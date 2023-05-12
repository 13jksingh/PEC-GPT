import * as React from 'react';
import TablePart from '../../components/TablePart';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from "@mui/material";

function createData(name, value) {
  return { name, value };
}
const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

const data = {
  "Part Name": "part name",
  "Material Composition": "Aluminium",
  "Age (years)": "1",
  "Condition": "used",
  "Location": "india",
  "Manufacturer": "aero",
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
  "Life Cycle Assessment Score": "6"
}

const ManuPart = () => {
  return (
    <div style={{ padding: "50px"}}>
      <Typography style={{ backgroundColor: "turquoise" }} variant="string" gutterBottom>
        India
      </Typography>
      <Typography variant='h1'>Engine</Typography>
      <hr style={{ borderTop: "1px solid #adacac", margin: "30px 0px 30px 0px" }} />

      <div style={{ display: "grid", gridTemplateColumns: ".40fr 1fr" , paddingBottom:"30px" }}>
        <Skeleton variant="rectangular" style={{ width: "300px", height: "300px" }}>
          <Avatar style={{ width: "300px", height: "300px" }} />
        </Skeleton>

        <div>
          <Grid container style={{ padding: "35px" }}>
            <Grid item md={12} style={{ padding: "15px" }}>
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
            <Grid item md={12} style={{ padding: "15px" }}>
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
            <Grid item md={12} style={{ padding: "15px" }}>
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
        </div>
      </div>
      <TablePart rows={rows} />
      <TablePart rows={rows} />
    </div>
  )
}

export default ManuPart