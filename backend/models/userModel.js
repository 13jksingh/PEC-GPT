const { connection } = require("../config/db.config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/db.config");

const User = function (user) {
    if (!user.first_name || !user.last_name || !user.email || !user.userType || !user.password) {
      throw new Error('All fields are required.');
    }
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, 10);
    this.created_at = new Date();
    this.updated_at = new Date();
    this.userType = user.userType;
    this.verified = false;
  };
  
  User.create = (newUser, result) => {
    connection.query("SELECT COUNT(*) as count FROM userTable WHERE email = ?", [newUser.email], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res[0].count > 0) {
        result({ message: "EmailID already registered." }, null);
        return;
      }
  
   
      connection.query("INSERT INTO userTable SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        result(null, { id: res.insertId, ...newUser });
      });
    });
  };
  User.verifyEmail = (token, result) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      connection.query(
        "UPDATE userTable SET verified = true WHERE email = ?",
        decoded.email,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
  
          if (res.affectedRows == 0) {
            result({ message: "User not found" }, null);
            return;
          }
  
          result(null, { message: "Email verification successful" });
        }
      );
    });
  };

  User.findByEmail = (email, result) => {
    connection.query(
      "SELECT * FROM userTable WHERE email = ?",
      email,
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
  
        result(null, null);
      }
    );
  };
  
  

  module.exports = User;