const { Contract, JsonRpcProvider, formatUnits } = require("ethers");
const { QueryTypes } = require("sequelize");
const db = require("../models");
const dbMgr = db.sequelize;
const Op = db.Sequelize.Op;
const { default: axios } = require("axios");
const sha256 = require("js-sha256").sha256;
const _ = require("lodash");

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

exports.getPopularCollections = async (req, res) => {
  try {
    const topCollections = await dbMgr.query(
      "SELECT COUNT(NFTContractAddress) AS Amount,NFTContractAddress, Network FROM collection_discussions GROUP BY NFTContractAddress, Network ORDER BY Amount DESC LIMIT 0,12",
      { type: QueryTypes.SELECT }
    );

    const message = JSON.stringify({
      action: "get_collections",
    });
    const hmac = sha256.hmac(api_secret, message);
    const params = { api_key: api_key, hmac: hmac, message: message };
    const result = await axios.get(process.env.API_URL, { params: params });
    const allCollections = result.data.collections;
    let object = [];
    for (var collection of topCollections) {
      var item = allCollections.find(
        (e) =>
          e.type_id.toUpperCase() ===
          collection.NFTContractAddress.toUpperCase()
      );
      if (item) {
        object = [...object, { ...item, amount: collection.Amount, network: collection.Network }];
      }
    }
    res.send(_.orderBy(object, ["amount"], ["desc"]));
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
      message: "error occured while loading",
    });
  }
};

exports.getPopularNFTs = async (req, res) => {
  try {
    const topNfts = await dbMgr.query(
      "select COUNT(NFTContractAddress) as Amount,NFTContractAddress, TokenId, Network from nft_discussions Group By NFTContractAddress, TokenId, Network ORDER BY Amount DESC LIMIT 0,12;",
      { type: QueryTypes.SELECT }
    );
    let object = [];
    for (let nft of topNfts) {
      const message = JSON.stringify({
        action: "get_nft_details",
        contract_address: nft.NFTContractAddress,
        token_id: Number(nft.TokenId),
      });
      const hmac = sha256.hmac(api_secret, message);
      const params = { api_key: api_key, hmac: hmac, message: message };
      const result = await axios.get(process.env.API_URL, { params: params });

      object = [...object, {...nft, ...result.data.nft}]
    }

    res.send(object);
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
      message: "error occured while loading",
    });
  }
};
