import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import useGet from "../../hooks/useGet";
import PartCard from "../../components/PartCard";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import CheckBoxGroup from "../../components/CheckBoxGroup";
import Loading from "../Loading";

const ManuCatalog = () => {
  const [data, setData] = useState([]);

  //checkbox states
  const partNameList = {
    "Landing Gear": true,
    Engine: true,
    Avionics: true,
    Fuselage: true,
    Wing: true,
  };
  const [partName, setPartName] = useState(partNameList);

  const conditionList = {
    New: false,
    Used: true,
  };
  const [condition, setCondition] = useState(conditionList);

  const locationList = {
    Australia: true,
    "North America": true,
    Africa: true,
    "South America": true,
    Europe: true,
    Asia: true,
  };
  const [location, setLocation] = useState(locationList);

  const manufacturerList = {
    Boeing: false,
    Embraer: false,
    Bombardier: false,
    Cessna: false,
    Gulfstream: false,
    Airbus: true,
  };
  const [manufacturer, setManufacturer] = useState(manufacturerList);

  const materialCompositionList = {
    Aluminum: true,
    Titanium: true,
    Steel: true,
    Composite: true,
  };
  const [materialComposition, setMaterialComposition] = useState(
    materialCompositionList
  );

  const potentialUseCasesList = {
    Furniture: true,
    "Art Installations": true,
    "Building Materials": true,
    "Aircraft Maintenance": true,
    "Automotive Components": true,
  };
  const [potentialUseCases, setPotentialUseCases] = useState(
    potentialUseCasesList
  );

  const aircraftModelList = {
    737: true,
    "Citation X": true,
    A320: true,
    E175: true,
    G650: true,
    CRJ900: true,
  };
  const [aircraftModel, setaircraftModel] = useState(aircraftModelList);

  //slider states
  const [Ageyears, setAgeyears] = useState([0, 200]);
  const handleAgeyearsChange = (event, val) => setAgeyears(val);

  const [NewPartsCarbonFootprintkgCO2e, setNewPartsCarbonFootprintkgCO2e] =
    useState([0, 200]);
  const handleNewPartsCarbonFootprintkgCO2eChange = (event, val) =>
    setNewPartsCarbonFootprintkgCO2e(val);

  const [
    RecycledPartsCarbonFootprintkgCO2e,
    setRecycledPartsCarbonFootprintkgCO2e,
  ] = useState([0, 200]);
  const handleRecycledPartsCarbonFootprintkgCO2eChange = (event, val) =>
    setRecycledPartsCarbonFootprintkgCO2e(val);

  const [WaterUsageNewPartsliters, setWaterUsageNewPartsliters] = useState([
    0, 200,
  ]);
  const handleWaterUsageNewPartslitersChange = (event, val) =>
    setWaterUsageNewPartsliters(val);

  const [WaterUsageRecycledPartsliters, setWaterUsageRecycledPartsliters] =
    useState([0, 200]);
  const handleWaterUsageRecycledPartslitersChange = (event, val) =>
    setWaterUsageRecycledPartsliters(val);

  const [LandfillWasteNewPartskg, setLandfillWasteNewPartskg] = useState([
    0, 200,
  ]);
  const handleLandfillWasteNewPartskgChange = (event, val) =>
    setLandfillWasteNewPartskg(val);

  const [LandfillWasteRecycledPartskg, setLandfillWasteRecycledPartskg] =
    useState([0, 200]);
  const handleLandfillWasteRecycledPartskgChange = (event, val) =>
    setLandfillWasteRecycledPartskg(val);

  const [EnergyConsumptionNewPartskWh, setEnergyConsumptionNewPartskWh] =
    useState([0, 200]);
  const handleEnergyConsumptionNewPartskWhChange = (event, val) =>
    setEnergyConsumptionNewPartskWh(val);

  const [
    EnergyConsumptionRecycledPartskWh,
    setEnergyConsumptionRecycledPartskWh,
  ] = useState([0, 200]);
  const handleEnergyConsumptionRecycledPartskWhChange = (event, val) =>
    setEnergyConsumptionRecycledPartskWh(val);

  const [RecyclingRate, setRecyclingRate] = useState([0, 200]);
  const handleRecyclingRateChange = (event, val) => setRecyclingRate(val);

  const [ToxicityScoreNewParts, setToxicityScoreNewParts] = useState([0, 200]);
  const handleToxicityScoreNewPartsChange = (event, val) =>
    setToxicityScoreNewParts(val);

  const [ToxicityScoreRecycledParts, setToxicityScoreRecycledParts] = useState([
    0, 200,
  ]);
  const handleToxicityScoreRecycledPartsChange = (event, val) =>
    setToxicityScoreRecycledParts(val);

  const [LifeCycleAssessment, setLifeCycleAssessment] = useState([0, 200]);
  const handleLifeCycleAssessmentChange = (event, val) =>
    setLifeCycleAssessment(val);

  const [RenewableMaterialContent, setRenewableMaterialContent] = useState([
    0, 200,
  ]);
  const handleRenewableMaterialContentChange = (event, val) =>
    setRenewableMaterialContent(val);

  const [CarbonFootprintSavedkgCO2e, setCarbonFootprintSavedkgCO2e] = useState([
    0, 200,
  ]);
  const handleCarbonFootprintSavedkgCO2eChange = (event, val) =>
    setCarbonFootprintSavedkgCO2e(val);

  const [WaterUsageSavedliters, setWaterUsageSavedliters] = useState([0, 200]);
  const handleWaterUsageSavedlitersChange = (event, val) =>
    setWaterUsageSavedliters(val);

  const [LandfillWasteSavedkg, setLandfillWasteSavedkg] = useState([0, 200]);
  const handleLandfillWasteSavedkgChange = (event, val) =>
    setLandfillWasteSavedkg(val);

  const [EnergyConsumptionSavedkWh, setEnergyConsumptionSavedkWh] = useState([
    0, 200,
  ]);
  const handleEnergyConsumptionSavedkWhChange = (event, val) =>
    setEnergyConsumptionSavedkWh(val);

  const [ToxicityScoreDifference, setToxicityScoreDifference] = useState([
    0, 200,
  ]);
  const handleToxicityScoreDifferenceChange = (event, val) =>
    setToxicityScoreDifference(val);

  const [RemanufacturingPotential, setRemanufacturingPotential] = useState([
    0, 200,
  ]);
  const handleRemanufacturingPotentialChange = (event, val) =>
    setRemanufacturingPotential(val);

  const [LifeCycleAssessmentScore, setLifeCycleAssessmentScore] = useState([
    0, 200,
  ]);
  const handleLifeCycleAssessmentScoreChange = (event, val) =>
    setLifeCycleAssessmentScore(val);

  //setup useGet hook
  const { isLoading, error, sendRequest } = useGet(
    `${process.env.REACT_APP_BACKEND}/api/v1/data`
  );
  const mobile = useMediaQuery("(max-width:600px)");

  //useEffect for making the fetch call to the backend
  useEffect(() => {
    const handleGet = (newdata) => {
      //console.log(newdata);
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
    <Box sx={{ display: "flex", flexDirection: mobile ? "column" : "row" }}>
      <Box
        width={mobile ? "100%" : collapsed ? "20%" : "15%"}
        margin="1rem"
        sx={{ height: "50rem", overflow: "hidden", overflowY: "scroll" }}
      >
        <CheckBoxGroup
          state={partName}
          setState={setPartName}
          label="PART NAME"
          errorText="select alteast one"
        />

        <CheckBoxGroup
          state={condition}
          setState={setCondition}
          label="condition"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={materialComposition}
          setState={setMaterialComposition}
          label="MATERIAL"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={location}
          setState={setLocation}
          label="LOCATION"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={manufacturer}
          setState={setManufacturer}
          label="MANUFACTURER"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={aircraftModel}
          setState={setaircraftModel}
          label="Aircraft model"
          errorText="select alteast one"
        />
        <CheckBoxGroup
          state={potentialUseCases}
          setState={setPotentialUseCases}
          label="use cases"
          errorText="select alteast one"
        />
        <Slider
          slider={Ageyears}
          handleSliderChange={handleAgeyearsChange}
          label="Ageyears"
        />

        <Slider
          slider={NewPartsCarbonFootprintkgCO2e}
          handleSliderChange={handleNewPartsCarbonFootprintkgCO2eChange}
          label="NewPartsCarbonFootprintkgCO2e"
        />

        <Slider
          slider={RecycledPartsCarbonFootprintkgCO2e}
          handleSliderChange={handleRecycledPartsCarbonFootprintkgCO2eChange}
          label="RecycledPartsCarbonFootprintkgCO2e"
        />

        <Slider
          slider={WaterUsageNewPartsliters}
          handleSliderChange={handleWaterUsageNewPartslitersChange}
          label="WaterUsageNewPartsliters"
        />

        <Slider
          slider={WaterUsageRecycledPartsliters}
          handleSliderChange={handleWaterUsageRecycledPartslitersChange}
          label="WaterUsageRecycledPartsliters"
        />

        <Slider
          slider={LandfillWasteNewPartskg}
          handleSliderChange={handleLandfillWasteNewPartskgChange}
          label="LandfillWasteNewPartskg"
        />

        <Slider
          slider={LandfillWasteRecycledPartskg}
          handleSliderChange={handleLandfillWasteRecycledPartskgChange}
          label="LandfillWasteRecycledPartskg"
        />

        <Slider
          slider={EnergyConsumptionNewPartskWh}
          handleSliderChange={handleEnergyConsumptionNewPartskWhChange}
          label="EnergyConsumptionNewPartskWh"
        />

        <Slider
          slider={EnergyConsumptionRecycledPartskWh}
          handleSliderChange={handleEnergyConsumptionRecycledPartskWhChange}
          label="EnergyConsumptionRecycledPartskWh"
        />

        <Slider
          slider={RecyclingRate}
          handleSliderChange={handleRecyclingRateChange}
          label="RecyclingRate"
        />

        <Slider
          slider={ToxicityScoreNewParts}
          handleSliderChange={handleToxicityScoreNewPartsChange}
          label="ToxicityScoreNewParts"
        />

        <Slider
          slider={ToxicityScoreRecycledParts}
          handleSliderChange={handleToxicityScoreRecycledPartsChange}
          label="ToxicityScoreRecycledParts"
        />

        <Slider
          slider={LifeCycleAssessment}
          handleSliderChange={handleLifeCycleAssessmentChange}
          label="LifeCycleAssessment"
        />

        <Slider
          slider={RenewableMaterialContent}
          handleSliderChange={handleRenewableMaterialContentChange}
          label="RenewableMaterialContent"
        />

        <Slider
          slider={CarbonFootprintSavedkgCO2e}
          handleSliderChange={handleCarbonFootprintSavedkgCO2eChange}
          label="CarbonFootprintSavedkgCO2e"
        />

        <Slider
          slider={WaterUsageSavedliters}
          handleSliderChange={handleWaterUsageSavedlitersChange}
          label="WaterUsageSavedliters"
        />

        <Slider
          slider={LandfillWasteSavedkg}
          handleSliderChange={handleLandfillWasteSavedkgChange}
          label="LandfillWasteSavedkg"
        />

        <Slider
          slider={EnergyConsumptionSavedkWh}
          handleSliderChange={handleEnergyConsumptionSavedkWhChange}
          label="EnergyConsumptionSavedkWh"
        />

        <Slider
          slider={ToxicityScoreDifference}
          handleSliderChange={handleToxicityScoreDifferenceChange}
          label="ToxicityScoreDifference"
        />

        <Slider
          slider={RemanufacturingPotential}
          handleSliderChange={handleRemanufacturingPotentialChange}
          label="RemanufacturingPotential"
        />

        <Slider
          slider={LifeCycleAssessmentScore}
          handleSliderChange={handleLifeCycleAssessmentScoreChange}
          label="LifeCycleAssessmentScore"
        />
      </Box>
      <FlexBetween flexDirection="column" marginRight="1rem" width="100%" marginBottom="2rem">
        {data.map((item,indx) => (
          <PartCard data={item} key={indx} />
        ))}
      </FlexBetween>
    </Box>
  );
};

export default ManuCatalog;
