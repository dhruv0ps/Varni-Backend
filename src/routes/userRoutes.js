const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.get("/current", userController.getCurrentUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
