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


  static getAllMetrics(result) {
    let sqlQuery = `SELECT * FROM data`;

    let countQuery = `SELECT COUNT(*) as count FROM data WHERE status = 'completed'`;

    connection.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      let transformedPieData = {};
      let pieData = {};
      let conditionPie = {};
      let transformedConditionPie = {};
      let statusBar = {
        "Carbon Footprint Saved (kg CO2e)": 0,
        "Water Usage Saved (liters)": 0,
        "Landfill Waste Saved (kg)": 0,
        "Energy Consumption Saved (kWh)":0
      };
      let mockBar = {};
      let performance_metric = {
        Boeing:0,
        Embraer:0,
        Bombardier:0,
        Cessna:0,
        Gulfstream:0,
        Airbus:0
      }
      let mock_performance = [];
      res.forEach(i => {
        if (i.status === 'completed') {
            pieData[i["Material Composition"]] = (pieData[i["Material Composition"]] + 1) || 1;
            conditionPie[i["Condition"]] = (conditionPie[i["Condition"]] + 1) || 1;
            Object.keys(statusBar).forEach(key => {
                statusBar[key] += i[key] || 0;
            });
            if (i["Manufacturer"] in performance_metric) {
                performance_metric[i["Manufacturer"]] += ((i["Life Cycle Assessment Score"])/2) || 0;
            }
        }
      });
      transformedPieData = Object.entries(pieData).map(([key, value]) => ({ id: key, label: key, value }));
      transformedConditionPie = Object.entries(conditionPie).map(([key, value]) => ({ id: key, label: key, value }));
      mockBar = Object.entries(statusBar).map(([key, value]) => ({ status: key, [key]: value }));
      mock_performance = Object.entries(performance_metric).map(([key, value]) => ({ status: key, [key]: value }));

      connection.query(countQuery, (err, countResult) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        result(null, { count: countResult[0].count, MaterialCompostion:transformedPieData, Condition: transformedConditionPie, statusBar:mockBar, performanceMetric:mock_performance });
      });
    });
}



  static request(dataID, status, email, result) {
    connection.query("SELECT userId FROM userTable WHERE email = ?", email, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        const userId = res[0].userId;
        const statusData = {
          userId: userId,
          dataID: dataID,
          bought: 0,
          sold: 0,
          requested: 1
        };
        connection.query("INSERT INTO status SET ?", statusData, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created status: ", { id: res.insertId, ...statusData });
            connection.query(
                "UPDATE data SET status = ? WHERE dataID = ?",
                [status, dataID],
                (err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
            
                  connection.query(
                      "SELECT `Part Name`, `Material Composition`, `Age (years)` FROM data WHERE dataID = ?",
          
                    [dataID],
                    (err, res) => {
                      if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                      }
            
                      console.log("updated data: ", res[0]);
                      result(null, res[0]);
                    }
                  );
                }
            );
        });
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

  static create(data, email, result) {
    connection.query("SELECT userId FROM userTable WHERE email = ?", email, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const userId = res[0].userId;
      connection.query("SELECT MAX(dataID) AS max_id FROM data", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        const dataID = res[0].max_id + 1;
        const statusData = {
          userId: userId,
          dataID: dataID,
          bought: 0,
          sold: 1,
          requested: 0
        };
        connection.query("INSERT INTO status SET ?", statusData, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("created status: ", { id: res.insertId, ...statusData });
          connection.query("INSERT INTO data SET ?", data, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created data: ", { id: res.insertId, ...data });
            result(null, { id: res.insertId, ...data });
          });
        });
      });
    });
  }
  
  static updateStatus(dataID, email,status, result) {
    connection.query("SELECT userId FROM userTable WHERE email = ?", email, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        const userId = res[0].userId;
        const statusData = {
          userId: userId,
          dataID: dataID,
          bought: 1,
          sold: 0,
          requested: 0
        };
        connection.query("UPDATE status SET bought = ?, request = ? WHERE dataID = ?", [1,0,dataID], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created status: ", { id: res.insertId, ...statusData });
            connection.query(
                "UPDATE data SET status = ? WHERE dataID = ?",
                [status, dataID],
                (err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  console.log("updated data: ", { dataID: dataID, status: status });
                  result(null, { dataID: dataID, status: status });
                }
              );
        });
    });
    
  }
}




module.exports = Data;
