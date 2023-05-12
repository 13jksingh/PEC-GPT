const Data = require("../models/dataModel");
const connection = require("./../config/db.config").connection;
const JWT_SECRET = require("./../config/db.config").JWT_SECRET;
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


exports.listData = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 5;
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
  
    const data = new Data(req.body.partName, req.body.materialComposition, req.body.age, req.body.location, req.body.condition, req.body.manufacturer, req.body.aircraftModel, req.body.potentialUseCases, req.body.newCarbon, req.body.recycledCarbon, req.body.newWater, req.body.recycledWater, req.body.newLandfill, req.body.recycledLandfill, req.body.newEnergy, req.body.recycledEnergy, req.body.recyclingRate, req.body.newToxicity, req.body.recycledToxicity, req.body.manufacturingPotential, req.body.lifeCycleAssessment, req.body.renewableContent, req.body.carbonFootprintContent, req.body.waterUsageSaved, req.body.landfillSaved, req.body.energySaved, req.body.toxicityScoreDiff, req.body.remanufacturingPotential, req.body.lifeCycleAssessmentScore);
  
    Data.create(data, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
        else {
        
  
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
  
  
  
  
  
  
  
