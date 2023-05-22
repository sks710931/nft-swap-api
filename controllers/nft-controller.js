const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const sha256 = require("js-sha256").sha256;


const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

exports.getNFTDetail = async function (req, res, next) {
    try {
      const message = JSON.stringify({
        action: "get_nft_details",
        contract_address: req.params.contractAddress.toString(),
        token_id: Number(req.params.tokenId)
      });
      const hmac = sha256.hmac(api_secret, message);
      const params = { api_key: api_key, hmac: hmac, message: message };
      const result = await axios.get(process.env.API_URL, { params: params });
      console.log(result);
      if (!result.data.success) {
        next(JSON.stringify({ success: false, message: result.data.message }));
      } else {
  
        let tokenInfo = result.data.nft;
         
          
         tokenInfo = {...tokenInfo, network: "theta"};
          
        
        res.send({success: true, nft: tokenInfo}).status(200);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      next(err.message);
    }
  }

  exports.getCollections = async (req, res, next) =>{
    try {
      const message = JSON.stringify({
        action: "get_collections"
      });
      const hmac = sha256.hmac(api_secret, message);
      const params = { api_key: api_key, hmac: hmac, message: message };
      const result = await axios.get(process.env.API_URL, { params: params });
      console.log(result)
      if (!result.data.success) {
        next(JSON.stringify({ success: false, message: result.data.message }));
      } else {
        if(result.data.collections){
          var collections = result.data.collections.map(item =>({...item, network: "theta"}));
          res.send({success: true, collections: collections});
        }
        else{
          next("No collections available");
        }
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      next(err.message);
    }
  }