const express = require("express");
const router = express.Router();
const { fetchDonors } = require("../controllers/donorController");

router.get("/donors", fetchDonors);

module.exports = router;
