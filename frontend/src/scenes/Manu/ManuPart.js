import React, { useState, useEffect } from "react";
import TablePart from "../../components/TablePart";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Grid, useMediaQuery } from "@mui/material";
import useGet from "../../hooks/useGet";
import Loading from "../Loading";
import { useProSidebar } from "react-pro-sidebar";

const ManuPart = () => {
  //get dataID
  const id = useLocation().state.id;

  //navigate ot catalog if no id
  const navigate = useNavigate();
  if (!id) navigate("../catalog", { replace: true });

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

  return (
    <div style={{ padding: "50px" }}>
      <Typography
        style={{ backgroundColor: "turquoise" }}
        variant="string"
        gutterBottom
      >
        India
      </Typography>
      <Typography variant="h1">Engine</Typography>
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
        <Skeleton
          variant="rectangular"
          style={{ width: "300px", height: "300px" }}
        >
          <Avatar style={{ width: "300px", height: "300px" }} />
        </Skeleton>

        <div>
          <Grid container style={{ padding: "35px" }}>
            <Grid item md={12} style={{ padding: "15px" }}>
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
                  Boeing
                </Typography>
              </div>
            </Grid>
            <Grid item md={12} style={{ padding: "15px" }}>
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
                  Citation X
                </Typography>
              </div>
            </Grid>
            <Grid item md={12} style={{ padding: "15px" }}>
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
                  Aluminium
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      {data && <TablePart rows={data} />}
    </div>
  );
};

export default ManuPart;
