const express = require("express");
const router = express.Router();
const controller = require('../controllers/discussion-controller');

require("dotenv").config();

router.post("/create-nft-discussion", controller.createNftDiscussions);
router.post("/nft-discussions", controller.getNftDiscussions);
router.post("/create-collection-discussion", controller.createCollectionDiscussions);
router.post("/collection-discussions", controller.getCollectionDiscussions);
module.exports = router;