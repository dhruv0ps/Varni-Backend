const express = require("express")
var router = express.Router();
var bodyParser = require("body-parser")

const { authenticateToken } = require("../config/auth")

var jsonParser = bodyParser.json()
router.use(jsonParser)

module.exports = router