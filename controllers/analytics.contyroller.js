const { Contract, JsonRpcProvider, formatUnits } = require("ethers");
const { QueryTypes } = require('sequelize');
const db = require("../models");
const dbMgr = db.sequelize;
const Op = db.Sequelize.Op;

exports.getPopularCollections = async (req,res) => {
    try{
        const result = await dbMgr.query('SELECT COUNT(NFTContractAddress) AS Amount,NFTContractAddress FROM collection_discussions GROUP BY NFTContractAddress ORDER BY Amount DESC LIMIT 0,10',{type:QueryTypes.SELECT});
        res.send(result)
    }catch(err){
        res.status(500).send({success:false, error: err, message: "error occured while loading"})
    }
}


exports.getPopularNFTs = async (req,res) => {
    try{
        const result = await dbMgr.query('SELECT COUNT(NFTContractAddress) AS Amount,NFTContractAddress FROM nft_discussions GROUP BY NFTContractAddress ORDER BY Amount DESC LIMIT 0,10',{type:QueryTypes.SELECT});
        res.send(result)
    }catch(err){
        res.status(500).send({success:false, error: err, message: "error occured while loading"})
    }
}
