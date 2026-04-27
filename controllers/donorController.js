const donorModel = require("../models/donorModel");

const fetchDonors = (req, res) => {
  const { bloodGroup, location } = req.query;

  if (!bloodGroup || !location) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  donorModel.getDonors(bloodGroup, location, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

module.exports = { fetchDonors };
