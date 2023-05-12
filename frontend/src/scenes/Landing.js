import React from "react";
import Sidebar from "../components/Sidebar";
import PartCard from "../components/PartCard";
import FlexBetween from "../components/FlexBetween";

const Landing = () => {
  return (
    <FlexBetween>
      <Sidebar />
      <PartCard/>
    </FlexBetween>
  );
};

export default Landing;
