var express = require("express");
var router = express.Router();
const controller = require('../controllers/analytics.contyroller');

require("dotenv").config();

router.get("/popular-collections", controller.getPopularCollections);
router.get("/popular-nfts", controller.getPopularNFTs);

module.exports = router;