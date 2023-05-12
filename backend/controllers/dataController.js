const Data = require("../models/dataModel");
const connection = require("./../config/db.config").connection;
const JWT_SECRET = require("./../config/db.config").JWT_SECRET;
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


exports.listData = (req, res) => {
//   const start_date = req.query.start_date;
//   const end_date = req.query.end_date;
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
  
    const user = new User({
      "Part Name": req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      contact: req.body.contact,
      company_id: req.body.company_id,
      password: req.body.password,
      created_at: new Date(),
      updated_at: new Date(),
      verified : req.body.verified
    });
  
    User.create(user, (err, data) => {
      
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
          to: user.email,
          subject: "Verify your email address",
          html: `<p>Thank you for registering. Please click on the following link to verify your email address:</p><p>http://localhost:8000/verify-email/${token}</p>`,
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
  
  