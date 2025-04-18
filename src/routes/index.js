const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const panelRoutes = require("./panelRoutes");
const materialRoutes = require("./materialRoutes");
const sizeRoutes = require("./sizeRoutes");
const accessoriesRoutes = require("./accessoriesRoutes");
const iconRoutes = require("./iconRoutes");
const colorRoutes = require("./colorRoutes");

const { authenticateToken } = require("../config/auth");
const loginController = require("../controllers/loginController")
const userController = require("../controllers/userController");

var jsonParser = bodyParser.json();
router.use(jsonParser);

router.use("/panels", panelRoutes);
router.use("/material", materialRoutes);
router.use("/sizes", sizeRoutes);
router.use("/accessories", accessoriesRoutes);
router.use("/icon", iconRoutes);
router.use("/color", colorRoutes);

router.post("/login",loginController.loginUser);
router.get("/current",authenticateToken,userController.getCurrentUser);
module.exports = router;