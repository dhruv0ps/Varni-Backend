const express = require("express");
const router = express.Router();
const colorModularController = require("../controllers/colorController");

router.post("/create", colorModularController.createColorModular);
router.get("/", colorModularController.getAllColorModulars);
router.get("/:id", colorModularController.getColorModularById);
router.put("/:id", colorModularController.updateColorModular);
router.delete("/:id", colorModularController.deleteColorModular);

module.exports = router;
