import React, { useState, useEffect } from "react";
import Datagrid from "../../components/Datagrid";
import FlexBetween from "../../components/FlexBetween";
import Loading from "../Loading";
import CheckBoxGroup from "../../components/CheckBoxGroup";
import useGet from "../../hooks/useGet";
import { useMediaQuery, Typography } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";

const AeroHistory = () => {
  const [data, setData] = useState([]);

  const mobile = useMediaQuery("(max-width:600px)");

  //checkbox state
  const statusList = {
    requested: true,
    bought: true,
    sold: true,
  };
  const [status, setStatus] = useState(statusList);

  //setup useGet hook
  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/dat`
  );

  //useEffect for making the fetch call to the backend
  useEffect(() => {
    const handleGet = (newdata) => {
      console.log(newdata);
      setData((i) => newdata.data);
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

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h5" color="error">
          No parts have been exchanged by this account on AEROCONNECt
        </Typography>
      </div>
    );
  }

  return (
    <>
      <CheckBoxGroup
        state={status}
        setState={setStatus}
        label="STATUS"
        errorText="select atleast one"
      />
      <FlexBetween>
        <Datagrid data={data} />
      </FlexBetween>
    </>
  );
};

export default AeroHistory;