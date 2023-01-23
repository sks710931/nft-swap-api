const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const sha256 = require("js-sha256").sha256;
require("dotenv").config();
/* GET users nfts. */

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

router.get("/:walletAddress", async function (req, res, next) {
  try {
    const message = JSON.stringify({
      action: "get_wallet_nfts",
      address: req.params.walletAddress.toString(),
    });
    const hmac = sha256.hmac(api_secret, message);
    const params = { api_key: api_key, hmac: hmac, message: message };
    const result = await axios.get(process.env.API_URL, { params: params });
    if (!result.data.success) {
      next(JSON.stringify({success: false, message: result.data.message}));
    } else {
      res.send(result.data).status(200);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    next(err.message);
  }
});

module.exports = router;
