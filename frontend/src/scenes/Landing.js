import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PartCard from "../components/PartCard";
import FlexBetween from "../components/FlexBetween";
import PieChart from "../charts/PieChart";
import Loading from "./Loading";
import BarChart from "../charts/BarChart";

const Landing = () => {
  const [pieChart1, setPieChart1] = useState([]);
  const [pieChart2, setPieChart2] = useState([]);
  const [barChart1, setBarChart1] = useState([]);
  const [barChart2, setBarChart2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/v1/metrics/data`)
      .then((response) => response.json())
      .then((data) => {
        console.log();
        setPieChart1((i) => data.Material_compostion);
        setPieChart2((i) => data.Condition);
        setBarChart1((i) => data.performance_metric);
        setBarChart1((i) => data.statusBar);

        // setBarChart((i) => data.statusBar);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <Box>
        <Box m="20px">
          <h1>PIECHART 1</h1>
          {pieChart1 !== [] && <PieChart data={pieChart1} />}
        </Box>

        <Box m="20px" height="75vh">
          <h1>PIECHART 2</h1>
          {pieChart2 !== [] && <PieChart data={pieChart2} />}
        </Box>

        <Box mt="200px" mb="200px" height="75vh">
          <h1>BARCHART</h1>
          {barChart1 !== [] && <BarChart data={barChart1} />}
        </Box>

        <Box mt="200px" mb="200px" height="75vh">
          <h1>BARCHART</h1>
          {barChart2 !== [] && <BarChart data={barChart2} />}
        </Box>
      </Box>
    </>
  );
};

export default Landing;
