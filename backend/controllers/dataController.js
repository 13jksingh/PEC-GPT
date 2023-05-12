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
