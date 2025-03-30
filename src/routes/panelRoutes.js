const express = require("express");
const router = express.Router();
const panelController = require("../controllers/panelController");

router.post("/create", panelController.createPanel);
router.get("/", panelController.getPanels);
router.get("/:id", panelController.getPanelById);
router.put("/:id", panelController.updatePanel);
router.delete("/:id", panelController.deletePanel);

module.exports = router;
