const connection = require("./../config/db.config").connection;
const JWT_SECRET = require("./../config/db.config").JWT_SECRET;
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


exports.login = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    User.findByEmail(email,(err, data) => {
      if (err) {
        res.status(500).send({
          message: "Error retrieving user with email " + email,
        });
      } else {
        if (!data) {
          res.status(401).send({
            message: "Authentication failed. User not found.",
          });
        } else {
          bcrypt.compare(password, data.password, (bcryptErr, bcryptResult) => {
            if (bcryptErr || !bcryptResult) {
              res.status(401).send({
                message: "Authentication failed. Invalid email or password.",
              });
            } else if (!data.verified) {
              res.status(401).send({
                message: "Authentication failed. Email not verified.",
              });
            } else {
              const token = jwt.sign(
                { id: data.id, email: data.email },
                JWT_SECRET,
                {
                  expiresIn: "120h",
                }
              );
              console.log(data);
  
              res.status(200).send({
                message: "Authentication successful.",
                token: token,
                username: data.first_name,
                userType: data.userType,
              });
            }
          });
        }
      }
    });
  };
  