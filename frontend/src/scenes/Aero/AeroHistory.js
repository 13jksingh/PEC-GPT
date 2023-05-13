import React, { useState, useEffect } from "react";
import Datagrid from "../../components/Datagrid";
import FlexBetween from "../../components/FlexBetween";
import Loading from "../Loading";
import CheckBoxGroup from "../../components/CheckBoxGroup";
import useGet from "../../hooks/useGet";
import { useMediaQuery, Typography, Box } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";

const RecHistory = () => {
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
    `${process.env.REACT_APP_BACKEND}/api/v1/data/history`
  );

  //useEffect for making the fetch call to the backend
  useEffect(() => {
    const handleGet = (newdata) => {
      let temp = [];
      if (status.requested) {
        newdata.requested.map((i) => temp.push(i));
      }
      if (status.sold) {
        newdata.sold.map((i) => temp.push(i));
      }
      if (status.bought) {
        newdata.bought.map((i) => temp.push(i));
      }
      setData((i) => temp);
    };

    sendRequest(handleGet);
  }, [sendRequest, status.bought, status.requested, status.sold]);

  //close sidebar on loading this page
  const { collapseSidebar } = useProSidebar();
  useEffect(() => {
    collapseSidebar();
  }, [collapseSidebar]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);
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
          No parts have been exchanged by this account on AEROCONNECT
        </Typography>
      </div>
    );
  }

  //columns for datagrid
  const columns = [
    { field: "Part Name", headerName: "Part Name" },
    {
      field: "Material Composition",
      headerName: "Material",
      cellClassName: "name-column--cell",
    },
    {
      field: "Age (years)",
      headerName: "Age",
      flex: 0.5,
    },
    {
      field: "Condition",
      headerName: "Condition",
      flex: 0.5,
    },
    {
      field: "Location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "Manufacturer",
      headerName: "Manufacturer",
      flex: 1,
    },
    {
      field: "Aircraft Model",
      headerName: "Aircraft Model",
      flex: 1,
    },
    {
      field: "Potential Use Cases",
      headerName: "use Cases",
      cellClassName: "status-column--cell",
    },
    {
      field: "New Parts Carbon Footprint (kg CO2e)",
      headerName: "New Part kg C02e",
    },
    {
      field: "Recycled Parts Carbon Footprint (kg CO2e)",
      headerName: "Re Part kg C02e",
    },
    {
      field: "Water Usage - New Parts (liters)",
      headerName: "Water Usage-New Parts",
    },
    {
      field: "Water Usage - Recycled Parts (liters)",
      headerName: "Water Usage - Recycled Parts",
    },
    {
      field: "Landfill Waste - New Parts (kg)",
      headerName: "Landfill Waste-New Parts",
    },
    {
      field: "Landfill Waste - Recycled Parts (kg)",
      headerName: "Landfill Waste-Recycled Parts",
    },
    {
      field: "Energy Consumption - New Parts (kWh)",
      headerName: "Energy Consumption-New Parts",
    },
    {
      field: "Energy Consumption - Recycled Parts (kWh)",
      headerName: "Energy Consumption-Recycled Parts",
    },
    {
      field: "Recycling Rate (%)",
      headerName: "Recycling Rate (%)",
    },
    {
      field: "Toxicity Score - New Parts",
      headerName: "Toxicity Score - New Parts",
    },
    {
      field: "Toxicity Score - Recycled Parts",
      headerName: "Toxicity Score - Recycled Parts",
    },
    {
      field: "Remanufacturing Potential",
      headerName: "Remanufacturing Potential",
    },
    {
      field: "Life Cycle Assessment",
      headerName: "Life Cycle Assessment",
    },
    {
      field: "Renewable Material Content (%)",
      headerName: "Renewable Material Content (%)",
    },
    {
      field: "Carbon Footprint Saved (kg CO2e)",
      headerName: "Carbon Footprint Saved (kg CO2e)",
    },
    {
      field: "Water Usage Saved (liters)",
      headerName: "Water Usage Saved (liters)",
    },
    {
      field: "Landfill Waste Saved (kg)",
      headerName: "Landfill Waste Saved (kg)",
    },
    {
      field: "Energy Consumption Saved (kWh)",
      headerName: "Energy Consumption Saved (kWh)",
    },
    {
      field: "Toxicity Score Difference",
      headerName: "Toxicity Score Difference",
    },
    {
      field: "Remanufacturing Potential (%)",
      headerName: "Remanufacturing Potential (%)",
    },
    {
      field: "Life Cycle Assessment Score",
      headerName: "Life Cycle Assessment Score",
    },
  ];

  return (
    <Box
      sx={{
        marginLeft: "2rem",
        marginRight: "2rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{marginTop:"40px"}}>
        <CheckBoxGroup
          state={status}
          setState={setStatus}
          label="STATUS"
          errorText="select atleast one"
        />
      </div>

      <FlexBetween>
        <Datagrid data={data} columns={columns} />
      </FlexBetween>
    </Box>
  );
};

export default RecHistory;
