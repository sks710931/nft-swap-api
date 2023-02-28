const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const sha256 = require("js-sha256").sha256;
const { db } = require("./../firebase/admin");
const erc721Abi = require("./../abis/erc721");
const helperAbi = require("./../abis/helper");
const ethers = require("ethers");

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
      next(JSON.stringify({ success: false, message: result.data.message }));
    } else {

      let tokenInfo = [];
      for(let nft of result.data.nfts){
        
        const token = {...nft, network: "theta"};
        tokenInfo = [token, ...tokenInfo];
      }
      res.send({success: true, nfts: tokenInfo}).status(200);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    next(err.message);
  }
});

router.get("/kava/:address", async (req, res, next) => {
  const address = req.params.address.toString();
  const contractsRef = db.collection("contracts");
  try {
    const contractsSnapshot = await contractsRef.get();
    const contracts = contractsSnapshot.docs.map((doc) => doc.data());
    const provider = new ethers.JsonRpcProvider(process.env.KAVA_RPC);
    

    let tokenInfo = [];
    for (let contract of contracts) {
      if (contract.type === "ERC721") {
        let token = {};
        const contractObj = new ethers.Contract(
          process.env.KAVA_HELPER,
          helperAbi,
          provider
        );
        console.log(contractObj)
          const items = await contractObj.getOwnerTokens(contract.address, address);
          for(var item of items){
            const x = {
              contract_address: contract.address,
              token_id: ethers.getNumber(item.tokenId),
              uri: item.tokenURI,
              network: "kava"
            };
            tokenInfo.push(x);
            console.log(x);
          }
      }
    }

    return res.status(201).json({success: true, nfts: tokenInfo});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again", error });
  }
});

const processUri = (uri) => {
  if (uri.includes("ipfs://")) {
    let url = uri;
    const newUrl = url.replace("ipfs://", "https://ipfs.io/ipfs/");
    return newUrl;
  } else {
    return uri;
  }
}
module.exports = router;
