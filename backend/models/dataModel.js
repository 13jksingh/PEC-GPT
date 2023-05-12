const { connection } = require("./../config/db.config");
const Data = {};

Data.getAll = (page, limit, result) => {
    const offset = (page - 1) * limit;
    let sqlQuery = `SELECT * FROM data`;
    sqlQuery += ` LIMIT ${limit} OFFSET ${offset}`;
  
    connection.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { data: res });
  
    });
};
Data.findById = (DataID, result) => {
    connection.query(
      `SELECT * FROM data WHERE dataID = "${DataID}"`,
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
  
        // Data with id not found
        result({ message: "Data not found" }, null);
      }
    );
  };
  

  
module.exports = Data;