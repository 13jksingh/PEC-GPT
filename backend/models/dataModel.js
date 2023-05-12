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

  
module.exports = Data;