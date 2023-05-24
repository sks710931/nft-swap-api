var express = require("express");
var router = express.Router();
const controller = require('../controllers/collection-settings.controller');

require("dotenv").config();

router.post("/create-collection-setting", controller.create);
module.exports = router;