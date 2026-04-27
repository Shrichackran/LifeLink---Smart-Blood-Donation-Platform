const db = require("../config/db");

const getDonors = (bloodGroup, location, callback) => {
  const query = `
    SELECT * FROM donors
    WHERE blood_group = ? AND location = ? AND availability = 1
  `;
  
  db.query(query, [bloodGroup, location], callback);
};

module.exports = { getDonors };
