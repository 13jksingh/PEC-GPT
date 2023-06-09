import React, { useState, useEffect } from "react";
import TablePart from "../components/TablePart";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Grid, useMediaQuery, Button } from "@mui/material";
import useGet from "../hooks/useGet";
import Loading from "./Loading";
import { useProSidebar } from "react-pro-sidebar";

//dialogue
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import FlexBetween from "../components/FlexBetween";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  aero: [
    "Age (years)",
    "Location",
    "Manufacturer",
    "Aircraft Model",
    "Material Composition",
    "",
  ],
  rec: [
    "Age (years)",
    "Location",
    "Manufacturer",
    "Aircraft Model",
    "Material Composition",
    "",
  ],
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
  //setup useGet request hook
  const {
    isLoading: loadingRequest,
    error: errorRequest,
    sendRequest: sendRequestReq,
  } = useGet(`${process.env.REACT_APP_BACKEND}/api/v1/data/requested/${id}`);

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

  //handle request dialogue
  const [dialogue, setDialogue] = useState(false);

  const handleClose = () => {
    setDialogue(false);
  };

  if (isLoading || loadingRequest) {
    return <Loading />;
  }

  if (error || errorRequest) {
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
    const handle = (data) => {
      setDialogue(data.message);
    };
    sendRequestReq(handle);
  };

  const showBeforeTable = {};
  //showMain[authState.userType].map((k) => (showBeforeTable[k] = data[k]));
  showMain.Manufacturer.map((k) => (showBeforeTable[k] = data[k]));

  console.log(showBeforeTable);

  return (
    <div style={{ padding: "50px" }}>
      <FlexBetween>
        <div>
          <Typography
            style={{ backgroundColor: "turquoise" }}
            variant="string"
            gutterBottom
          >
            {data["Condition"]}
          </Typography>
          <Typography variant="h1">{data["Part Name"]}</Typography>
        </div>

        <Button
          onClick={requestHandler}
          variant="contained"
          sx={{ marginTop: "20px", backgroundColor: "#4cceac" }}
        >
          REQUEST
        </Button>
      </FlexBetween>

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
                  <div style={{ marginRight: "20rem" }}>
                    <Typography
                      style={{
                        color: "#adacac",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
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
      <div>
        <Dialog
          open={dialogue ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {dialogue}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManuPart;
