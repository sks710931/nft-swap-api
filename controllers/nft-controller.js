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

  const getNftItems = async (pagenumber, typeId) => {
    const message = JSON.stringify({
      action: "get_collection_nfts",
      type_id: typeId,
      page: pagenumber
    });
    const hmac = sha256.hmac(api_secret, message);
    const params = { api_key: api_key, hmac: hmac, message: message };
    const result = await axios.get(process.env.API_URL, { params: params });
    return result;
  }
  exports.getCollectionItems = async (req, res, next) =>{
    try {
      let pagenumber = 1;
      result = await getNftItems(pagenumber, req.params.typeId.toString());
      console.log(result)
      if (!result.data.success) {
        next(JSON.stringify({ success: false, message: result.data.message }));
      } else {
        if(result.data){
          let nftItems = result.data.nfts;
          //check multiple pages
          if(nftItems.length === 1000){
            let newItems = [];
            
            do{
              pagenumber +=1;
              const newResult = await getNftItems(pagenumber, req.params.typeId.toString());
              newItems = newResult.data.nfts;
              console.log("fetching page ", pagenumber);
              nftItems = [...nftItems, ...newItems]
            }while(newItems.length===1000);
          }
          let nfts = nftItems.map(item => ({...item, network: "theta"}))
          res.send({nfts, items: nfts.length});
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