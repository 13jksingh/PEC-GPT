import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BreadCrumbs from "../components/BreadCrumbs";
import { Outlet } from "react-router-dom";
import {Box} from "@mui/material";

const Root = ({type}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar type={type}/>
      <Box sx={{ flexGrow: 1 }}>
        <Navbar type={type}/>
        <BreadCrumbs/>
        <Outlet/>
      </Box>
    </Box>
  );
};

export default Root;
