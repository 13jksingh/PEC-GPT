const Data = require("../models/dataModel");
const connection = require("./../config/db.config").connection;
const JWT_SECRET = require("./../config/db.config").JWT_SECRET;
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


exports.listData = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10;
//   const companyId = req.user.company_id; 
  Data.getAll(page, limit, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    } else {
      res.send(data);
    }
  });
};


exports.findDataById = (req, res) => {
    const dataID = req.params.data_id;
    console.log(dataID);
    Data.findById(dataID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Data with id ${dataID} not found.`,
          });
        } else {
          res.status(500).send({
            message: `Error retrieving Data with id ${dataID}`,
          });
        }
      } else {
        res.send(data);
      }
    });
  };

  exports.createData = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const email = req.user.email;
  
    const data = new Data({
      "Part Name": req.body.part_name,
    //   "Material Composition": req.body.material_composition,
    //   "Age (years)": req.body.age,
    //   "Location": req.body.location,
    //   "Condition": req.body.condition,
    //   "Manufacturer": req.body.manufacturer,
    //   "Aircraft Model": req.body.aircraft_model,
    //   "Potential Use Cases": req.body.potential_use_cases,
    //   "New Parts Carbon Footprint (kg CO2e)": req.body.new_carbon,
    //   "Recycled Parts Carbon Footprint (kg CO2e)": req.body.recycled_carbon,
    //   "Water Usage - New Parts (liters)": req.body.new_water,
    //   "Water Usage - Recycled Parts (liters)": req.body.recycled_water,
    //   "Landfill Waste - New Parts (kg)": req.body.new_landfill,
    //   "Landfill Waste - Recycled Parts (kg)": req.body.recycled_landfill,
    //   "Energy Consumption - New Parts (kWh)": req.body.new_energy,
    //   "Energy Consumption - Recycled Parts (kWh)": req.body.recycled_energy,
    //   "Recycling Rate (%)": req.body.recycling_rate,
    //   "Toxicity Score - New Parts": req.body.new_toxicity,
    //   "Toxicity Score - Recycled Parts": req.body.recycled_toxicity,
    //   "Remanufacturing Potential": req.body.manufacturing_potential,
    //   "Life Cycle Assessment": req.body.life_cycle_assessment,
    //   "Renewable Material Content (%)": req.body.renewable_content,
    //   "Carbon Footprint Saved (kg CO2e)": req.body.carbon_footprint_content,
    //   "Water Usage Saved (liters)": req.body.water_usage_saved,
    //   "Landfill Waste Saved (kg)": req.body.landfill_saved,
    //   "Energy Consumption Saved (kWh)": req.body.energy_saved,
    //   "Toxicity Score Difference": req.body.toxicity_score_diff,
    //   "Remanufacturing Potential (%)": req.body.remanufacturing_potential,
    //   "Life Cycle Assessment Score": req.body.life_cycle_assessment_score,
      
    });
  
    Data.create(data, (err, data) => {
      
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      
      else {
        
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
  
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'anurag.jindal@therrgroup.in',
            pass: 'arjtygnqgcsrppof',
            authMethod: 'PLAIN'
          },
        });
  
        const mailOptions = {
          from: 'anurag.jindal@therrgroup.in',
          to: email,
          subject: "Data posted on AeroConnect",
          html: "<p>Your Data has been listed on our website. Thank you for using AeroConnect!</p>" +
          "<p>Below is the information you have submitted:</p>" +
          "<ul>" +
          `<li>Part Name: ${req.body.part_name}</li>` +
          `<li>Material Composition: ${req.body.material_composition}</li>` +
          `<li>Age (years): ${req.body.age}</li>` +
          // Add the rest of the form data here
          "</ul>",
        };
  
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
  
        res.send(data);
      }
    });
  };
  
  