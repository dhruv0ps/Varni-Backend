const express = require("express");
const router = express.Router();
const iconModularController = require("../controllers/iconModularController");

router.post("/create", iconModularController.createIconModular);
router.get("/", iconModularController.getAllIconModulars);
router.get("/:id", iconModularController.getIconModularById);
router.put("/:id", iconModularController.updateIconModular);
router.delete("/:id", iconModularController.deleteIconModular);

module.exports = router;
