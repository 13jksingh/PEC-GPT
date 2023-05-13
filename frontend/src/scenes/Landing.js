import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import PartCard from "../components/PartCard";
import FlexBetween from "../components/FlexBetween";
import PieChart from "../charts/PieChart";
import BarChart1 from "../charts/BarChart1";
import BarChart2 from "../charts/BarChart2";

const Landing = () => {
  
    const [pieChart1, setPieChart1] = useState([]);
    const [pieChart2, setPieChart2] = useState([]);
    const [barChart1, setBarChart1] = useState([]);
    const [barChart2, setBarChart2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      fetch(
        `http://localhost:8000/api/v1/metrics/data`,
    
      )
        .then((response) => response.json())
        .then((data) => {
          setPieChart1((i) => data.Material_compostion);
          setPieChart2((i) => data.Condition);
          setBarChart1((i) => data.statusBar);
          setBarChart2((i) => data.performance_metric);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, []);

  return (
    <>
    {/* <FlexBetween>landing</FlexBetween> */}
    <Box>
      <Box m="20px" height="55vh">
        <h2>Overview of the recycled and repurposed materials</h2>
        {pieChart1 !== [] && <PieChart data={pieChart1} />}
      </Box>

      <Box m="20px" height="55vh">
        {/* <h1>Overview of the recycled and repurposed materials</h1> */}
        {pieChart2 !== [] && <PieChart data={pieChart2} />}
      </Box>

      <Box mt="200px" mb="200px" height="75vh">
          <h1>Environmental impact metrics</h1>
          {barChart1 !== [] && <BarChart1 data={barChart1} />}
      </Box>

      <Box mt="200px" mb="200px" height="75vh">
          <h1>Performance metrics</h1>
          {barChart2 !== [] && <BarChart2 data={barChart2} />}
      </Box>
    </Box>
    </>
  )
};

export default Landing;
