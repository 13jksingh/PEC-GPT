import React, { useState, useEffect } from "react";
import TablePart from "../../components/TablePart";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Grid, useMediaQuery, Button } from "@mui/material";
import useGet from "../../hooks/useGet";
import Loading from "../Loading";
import { useProSidebar } from "react-pro-sidebar";
import { useAuthContext } from "../../auth/authContext";

//these will not be passed down to tablepart element
const showMain = {
  Manufacturer: [
    "Age (years)",
    "Location",
    "Manufacturer",
    "Aircraft Model",
    "Material Composition",
    "",
  ],
  aero: [],
  rec: [],
};

const ManuPart = () => {
  //get dataID
  //navigate ot catalog if no id
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === null) navigate("../catalog", { replace: true });
  }, [location, navigate]);

  const id = location.state.id;

  //part data
  const [data, setData] = useState([]);

  //setup useGet hook
  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/data/${id}`
  );
  const mobile = useMediaQuery("(max-width:600px)");

  //useEffect for making the fetch call to the backend
  useEffect(() => {
    const handleGet = (newdata) => {
      setData((i) => newdata);
    };

    sendRequest(handleGet);
  }, [sendRequest]);

  //close sidebar on loading this page
  const { collapseSidebar } = useProSidebar();
  useEffect(() => {
    collapseSidebar();
  }, [collapseSidebar]);

  const authObject = useAuthContext();

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

  const requestHandler = () => {
    //handler request
    console.log("req");
  };

  console.log(data);
  const showBeforeTable = {};
  showMain.Manufacturer.map((k) => (showBeforeTable[k] = data[k]));

  console.log(showBeforeTable);

  return (
    <div style={{ padding: "50px" }}>
      <Typography
        style={{ backgroundColor: "turquoise" }}
        variant="string"
        gutterBottom
      >
        {data["Condition"]}
      </Typography>
      <Typography variant="h1">{data["Part Name"]}</Typography>
      <Button
        onClick={requestHandler}
        variant="outlined"
        sx={{ marginTop: "20px" }}
      >
        REQUEST
      </Button>
      <hr
        style={{ borderTop: "1px solid #adacac", margin: "30px 0px 30px 0px" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: ".40fr 1fr",
          paddingBottom: "30px",
        }}
      >
        <div>
          <Grid container style={{ padding: "35px" }}>
            {Object.keys(showBeforeTable).map((k, indx) => {
              return (
                <Grid item md={6} style={{ padding: "15px" }} key={indx}>
                  <div>
                    <Typography
                      style={{ color: "#adacac" }}
                      variant="p"
                      gutterBottom
                    >
                      {k}
                    </Typography>
                    <br />
                    <Typography
                      style={{ fontWeight: "bold" }}
                      variant="p"
                      gutterBottom
                    >
                      {showBeforeTable[k]}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
      {data && <TablePart rows={data} skipRows={showBeforeTable} />}
    </div>
  );
};

export default ManuPart;
