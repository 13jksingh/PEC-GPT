const connection = require("./../config/db.config").connection;
const JWT_SECRET = require("./../config/db.config").JWT_SECRET;
const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created_at: new Date(),
    updated_at: new Date(),
    userType : req.body.userType,
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
          user: 'aero.connect0@gmail.com',
          pass: 'cfumzzgfzzqtgtpl',
          authMethod: 'PLAIN'
        },
      });

      const mailOptions = {
        from: 'aero.connect0@gmail.com',
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Thank you for registering. Please click on the following link to verify your email address:</p><p>http://65.0.89.63/verify-email/${token}</p>`,
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

exports.verifyEmail = (req, res) => {
    const token = req.params.token;
    User.verifyEmail(token, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while verifying the email.",
        });
      } else {
        res.send(data);
      }
    });
  };
  
