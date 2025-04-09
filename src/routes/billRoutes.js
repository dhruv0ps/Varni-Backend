const express = require("express");
const billController = require("../controllers/billController");

const router = express.Router();

router.post("/generate-bill", billController.generateBillDetails);
router.post("/calculate-bill", billController.calculateBill);

module.exports = router;
