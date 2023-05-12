import React, { useState, useEffect } from "react";
import Datagrid from "../../components/Datagrid";
import FlexBetween from "../../components/FlexBetween";
import Loading from "../Loading";
import CheckBoxGroup from "../../components/CheckBoxGroup";
import useGet from "../../hooks/useGet";
import { useMediaQuery, Typography } from "@mui/material";
import {useProSidebar} from "react-pro-sidebar";

const ManuHistory = () => {
  const [data, setData] = useState([]);

  //setup useGet hook
  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/data`
  );
  const mobile = useMediaQuery("(max-width:600px)");

  //useEffect for making the fetch call to the backend
  useEffect(() => {
    const handleGet = (newdata) => {
      console.log(newdata);
      setData((i) => newdata.data);
    };

    sendRequest(handleGet);
  }, [sendRequest]);

  //close sidebar on loading this page
  const { collapseSidebar, collapsed } = useProSidebar();
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
    <>
      <CheckBoxGroup />
      <FlexBetween>
        <Datagrid data={data} />
      </FlexBetween>
    </>
  );
};

export default ManuHistory;
