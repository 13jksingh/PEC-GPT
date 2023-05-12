const { connection } = require("./../config/db.config");

class Data {
    constructor(partName, materialComposition, age, location, condition, manufacturer, aircraftModel, potentialUseCases, newCarbon, recycledCarbon, newWater, recycledWater, newLandfill, recycledLandfill, newEnergy, recycledEnergy, recyclingRate, newToxicity, recycledToxicity, manufacturingPotential, lifeCycleAssessment, renewableContent, carbonFootprintContent, waterUsageSaved, landfillSaved, energySaved, toxicityScoreDiff, remanufacturingPotential, lifeCycleAssessmentScore) {
      this["Part Name"] = partName;
      this["Material Composition"] = materialComposition;
      this["Age (years)"] = age;
      this["Location"] = location;
      this["Condition"] = condition;
      this["Manufacturer"] = manufacturer;
      this["Aircraft Model"] = aircraftModel;
      this["Potential Use Cases"] = potentialUseCases;
      this["New Parts Carbon Footprint (kg CO2e)"] = newCarbon;
      this["Recycled Parts Carbon Footprint (kg CO2e)"] = recycledCarbon;
      this["Water Usage - New Parts (liters)"] = newWater;
      this["Water Usage - Recycled Parts (liters)"] = recycledWater;
      this["Landfill Waste - New Parts (kg)"] = newLandfill;
      this["Landfill Waste - Recycled Parts (kg)"] = recycledLandfill;
      this["Energy Consumption - New Parts (kWh)"] = newEnergy;
      this["Energy Consumption - Recycled Parts (kWh)"] = recycledEnergy;
      this["Recycling Rate (%)"] = recyclingRate;
      this["Toxicity Score - New Parts"] = newToxicity;
      this["Toxicity Score - Recycled Parts"] = recycledToxicity;
      this["Remanufacturing Potential"] = manufacturingPotential;
      this["Life Cycle Assessment"] = lifeCycleAssessment;
      this["Renewable Material Content (%)"] = renewableContent;
      this["Carbon Footprint Saved (kg CO2e)"] = carbonFootprintContent;
      this["Water Usage Saved (liters)"] = waterUsageSaved;
      this["Landfill Waste Saved (kg)"] = landfillSaved;
      this["Energy Consumption Saved (kWh)"] = energySaved;
      this["Toxicity Score Difference"] = toxicityScoreDiff;
      this["Remanufacturing Potential (%)"] = remanufacturingPotential;
      this["Life Cycle Assessment Score"] = lifeCycleAssessmentScore;
    }

  static getAll(page, limit, result) {
    const offset = (page - 1) * limit;
    let sqlQuery = `SELECT * FROM data`;
    sqlQuery += ` LIMIT ${limit} OFFSET ${offset}`;

    connection.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { data: res });
    });
  }

  static findById(DataID, result) {
    connection.query(
      `SELECT * FROM data WHERE dataID = "${DataID}"`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          result(null, res[0]);
          return;
        }

        // Data with id not found
        result({ message: "Data not found" }, null);
      }
    );
  }

  static create(data, result) {
    connection.query("INSERT INTO data SET ?", data, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created data: ", { id: res.insertId, ...data });
      result(null, { id: res.insertId, ...data });
    });
  }
}

module.exports = Data;
