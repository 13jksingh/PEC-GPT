import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Outlet } from "react-router-dom";
import {Box} from "@mui/material";

const AeroRoot = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar type="aero"/>
      <Box sx={{ flexGrow: 1 }}>
        <Navbar type="aero"/>
        <BreadCrumbs/>
        <Outlet/>
      </Box>
    </Box>
  );
};

export default AeroRoot;
