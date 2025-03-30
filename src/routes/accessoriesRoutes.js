const express = require("express");
const router = express.Router();
const accessoriesController = require("../controllers/accessoriesController");

router.post("/create", accessoriesController.createAccessory);
router.get("/", accessoriesController.getAllAccessories);
router.get("/:id", accessoriesController.getAccessoryById);
router.put("/:id", accessoriesController.updateAccessory);
router.delete("/:id", accessoriesController.deleteAccessory);

module.exports = router;
