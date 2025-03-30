const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const panelRoutes = require("./panelRoutes");
const materialRoutes = require("./materialRoutes");
const sizeRoutes = require("./sizeRoutes");
const accessoriesRoutes = require("./accessoriesRoutes");
const iconRoutes = require("./iconRoutes");
const colorRoutes = require("./colorRoutes");
const billRoutes = require("./billRoutes");

const { authenticateToken } = require("../config/auth");

var jsonParser = bodyParser.json();
router.use(jsonParser);

router.use("/panel", authenticateToken, panelRoutes);
router.use("/material", authenticateToken, materialRoutes);
router.use("/sizes", authenticateToken, sizeRoutes);
router.use("/accessories", authenticateToken, accessoriesRoutes);
router.use("/icon", authenticateToken, iconRoutes);
router.use("/color", authenticateToken, colorRoutes);
router.use("/bill", billRoutes);

module.exports = router;
