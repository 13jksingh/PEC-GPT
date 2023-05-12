const Data = require("../models/dataModel");


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
  