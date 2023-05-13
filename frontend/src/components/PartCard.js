import * as React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PartCard = ({ data }) => {
  const navigate = useNavigate();

  const cardClickHandler = (event) => {
    event.preventDefault();
    navigate("part", { replace: true, state: { id: data.dataID } });
  };

  return (
    <Card
      sx={{
        width: "100%",
        marginLeft: "3rem",
        marginRight: "3rem",
        height: "10rem",
        marginTop: "1rem",
      }}
    >
      <CardActionArea
        onClick={cardClickHandler}
        sx={{ width: "100%", height: "100%" }}
        style={{ borderLeft: "5px solid turquoise" }}
      >
        <CardContent>
          <Typography
            style={{ backgroundColor: "turquoise" }}
            variant="string"
            gutterBottom
          >
            {data.Condition}
          </Typography>

          <Grid container>
            <Grid item md={6}>
              <Typography
                style={{ fontWeight: "bold" }}
                variant="h2"
                gutterBottom
              >
                {data["Part Name"]}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h3">{data["Age (years)"]} years</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={3}>
              <div>
                <Typography
                  style={{ color: "#adacac" }}
                  variant="p"
                  gutterBottom
                >
                  Aircraft Model
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="p"
                  gutterBottom
                >
                  {data["Aircraft Model"]}
                </Typography>
              </div>
            </Grid>
            <Grid item md={3}>
              <div>
                <Typography
                  style={{ color: "#adacac" }}
                  variant="p"
                  gutterBottom
                >
                  Material Composition
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="p"
                  gutterBottom
                >
                  {data["Material Composition"]}
                </Typography>
              </div>
            </Grid>

            <Grid item md={3}>
              <div>
                <Typography
                  style={{ color: "#adacac" }}
                  variant="p"
                  gutterBottom
                >
                  Location
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="p"
                  gutterBottom
                >
                  {data["Location"]}
                </Typography>
              </div>
            </Grid>

            <Grid item md={3}>
              <div>
                <Typography
                  style={{ color: "#adacac" }}
                  variant="p"
                  gutterBottom
                >
                  Manufacturer
                </Typography>
                <br />
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="p"
                  gutterBottom
                >
                  {data["Manufacturer"]}
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
