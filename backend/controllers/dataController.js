const Data = require("../models/dataModel");
const connection = require("./../config/db.config").connection;
const JWT_SECRET = require("./../config/db.config").JWT_SECRET;
const jwt = require("jsonwebtoken");
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

exports.metrics = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  //   const companyId = req.user.company_id;
  Data.getAllMetrics((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.request = (req, res) => {
  const dataID = req.params.data_id;
  const email = req.user.email;
  const status = "requested";
  Data.request(dataID, status, email, (err, data) => {
    if (err) {
      if (err.message === "Data not found") {
        res.status(404).send({
          message: `Data with id ${dataID} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Data with id ${dataID}`,
        });
      }
    } else {
      const token = jwt.sign({ email: email }, JWT_SECRET);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aero.connect0@gmail.com",
          pass: "cfumzzgfzzqtgtpl",
          authMethod: "PLAIN",
        },
      });

      const mailOptions = {
        from: "aero.connect0@gmail.com",
        to: email,
        subject: "Data requested on AeroConnect",
        html:
          "<p>Your Data has been requested on our website. Thank you for using AeroConnect!</p>" +
          "<p>Below is the information you have requested:</p>" +
          "<ul>" +
          `<li>Part Name: ${data["Part Name"]}</li>` +
          `<li>Material Composition: ${data["Material Composition"]}</li>` +
          `<li>Age (years): ${data["Age (years)"]}</li>` +
          "</ul>" +
          `<p>Please click on the following link to verify your email address:</p><p>http://65.0.89.63/complete/${dataID}/${token}</p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      res.send({
        message: `An email has been sent to ${email}. Please click on the link in the email to complete your request.`,
      });
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

  const data = new Data(
    req.body.partName,
    req.body.materialComposition,
    req.body.age,
    req.body.location,
    req.body.condition,
    req.body.manufacturer,
    req.body.aircraftModel,
    req.body.potentialUseCases,
    req.body.newCarbon,
    req.body.recycledCarbon,
    req.body.newWater,
    req.body.recycledWater,
    req.body.newLandfill,
    req.body.recycledLandfill,
    req.body.newEnergy,
    req.body.recycledEnergy,
    req.body.recyclingRate,
    req.body.newToxicity,
    req.body.recycledToxicity,
    req.body.manufacturingPotential,
    req.body.lifeCycleAssessment,
    req.body.renewableContent,
    req.body.carbonFootprintContent,
    req.body.waterUsageSaved,
    req.body.landfillSaved,
    req.body.energySaved,
    req.body.toxicityScoreDiff,
    req.body.remanufacturingPotential,
    req.body.lifeCycleAssessmentScore
  );

  Data.create(data, email, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aero.connect0@gmail.com",
          pass: "cfumzzgfzzqtgtpl",
          authMethod: "PLAIN",
        },
      });

      const mailOptions = {
        from: "aero.connect0@gmail.com",
        to: email,
        subject: "Data posted on AeroConnect",
        html:
          "<p>Your Data has been listed on our website. Thank you for using AeroConnect!</p>" +
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

exports.complete = (req, res) => {
  const dataID = req.params.dataID;
  const token = req.params.token;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const email = decoded.email;

    Data.updateStatus(dataID, email, "completed", (err, data) => {
      if (err) {
        if (err.message === "Data not found") {
          res
            .status(404)
            .send({ message: `Data with id ${dataID} not found.` });
        } else {
          res
            .status(500)
            .send({ message: `Error updating Data with id ${dataID}` });
        }
      } else {
        console.log(email);
        res.send({
          message: `Your request for the product has been completed.`,
        });
      }
    });
  });
};

exports.history = (req, res) => {
  const email = req.user.email;
  const userQuery = `SELECT userId FROM userTable WHERE email = ?`;

  connection.query(userQuery, [email], (error, userResults) => {
    if (error) {
      console.log("error: ", error);
      res.status(500).send({
        message: "Error retrieving user ID",
      });
    } else {
      const userId = userResults[0].userId;
      const statusQuery = `SELECT dataID, bought, sold, requested FROM status WHERE userId = ?`;
      connection.query(statusQuery, [userId], (error, statusResults) => {
        if (error) {
          console.log("error: ", error);
          res.status(500).send({
            message: "Error retrieving status data",
          });
        } else {
          let history = {
            bought: [],
            sold: [],
            requested: [],
          };
          let promises = [];
          statusResults.forEach((row) => {
            const dataID = row.dataID;
            let promise = new Promise((resolve, reject) => {
              Data.findById(dataID, (err, data) => {
                if (err) {
                  console.log("error: ", err);
                  reject(err);
                } else {
                  if (row.bought === "1") {
                    history.bought.push(data);
                  }
                  if (row.sold === "1") {
                    history.sold.push(data);
                  }
                  if (row.requested === "1") {
                    history.requested.push(data);
                  }
                  resolve();
                }
              });
            });
            promises.push(promise);
          });
          Promise.all(promises)
            .then(() => {
              res.send(history);
            })
            .catch((err) => {
              res.status(500).send({
                message: `Error retrieving Data: ${err}`,
              });
            });
        }
      });
    }
  });
};
