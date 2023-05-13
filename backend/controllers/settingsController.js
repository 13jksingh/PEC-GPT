const connection = require("./../config/db.config").connection;
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.changeUsername = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    const inputPassword = req.body.password;
    const newFirstName = req.body.new_first_name;
    const email = req.user.email;
  
    User.findByEmail(email, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "An error occurred while updating user data",
        });
        return;
      }
  
      if (!user) {
        res.status(404).send({
          message: "User not found",
        });
        return;
      }
  
      bcrypt.compare(inputPassword, user.password, (bcryptErr, bcryptResult) => {
  
        if (bcryptErr || !bcryptResult) {
              res.status(401).send({
                message: "Authentication failed. Invalid email or password.",
              });
            }
  
        else if (!bcryptResult) {
          res.status(401).send({
            message: "Current password does not match",
          });
          return;
        }
  
        else{connection.query(
          "UPDATE userTable SET first_name = ?, last_name = ? WHERE email = ?",
          [newFirstName, email],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: "An error occurred while updating user data",
              });
              return;
            }
            res.status(200).send({
              message: "User data updated successfully",
            });
          }
      
        );
        }
      });
    });
  };
  

  exports.changeUserType = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
  
    const inputPassword = req.body.password;
    const newUserType = req.body.new_userType;
    const email = req.user.email;
  
    User.findByEmail(email, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "An error occurred while updating user's Type",
        });
        return;
      }
  
      if (!user) {
        res.status(404).send({
          message: "User not found",
        });
        return;
      }
  
      bcrypt.compare(inputPassword, user.password, (bcryptErr, bcryptResult) => {
  
        if (bcryptErr || !bcryptResult) {
              res.status(401).send({
                message: "Authentication failed. Invalid email or password.",
              });
            }
  
        else if (!bcryptResult) {
          res.status(401).send({
            message: "Current password does not match",
          });
          return;
        }
  
        else{connection.query(
          "UPDATE userTable SET userType = ? WHERE email = ?",
          [newUserType, email],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: "An error occurred while updating user's Type",
              });
              return;
            }
            res.status(200).send({
              message: "Uses's Type updated successfully",
            });
          }
      
        );
        }
      });
    });
  };