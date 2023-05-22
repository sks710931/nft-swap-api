var express = require("express");
var router = express.Router();
const controller = require('../controllers/nft-controller');

require("dotenv").config();

router.get("/get-nft-details/:contractAddress/:tokenId", controller.getNFTDetail);
router.get("/get-collections", controller.getCollections);
module.exports = router;