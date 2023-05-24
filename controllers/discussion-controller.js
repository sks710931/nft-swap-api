const db = require("../models");
const NFTDiscussions = db.nftDiscussions;
const CollectionDiscussions = db.collectionDiscussion
const Op = db.Sequelize.Op;
const { isAddress } = require("@ethersproject/address");

exports.createNftDiscussions = async (req, res) => {
    const contractAddress= req.body.contract;
    const sender = req.body.sender;
    const tokenId = req.body.tokenId;
    const network = req.body.network;
    const message = req.body.message;

    const obj = {
        NFTContractAddress: contractAddress,
        SenderAddress: sender,
        TokenId: tokenId,
        Message: message,
        Network: network
    }

    try{
        const comment = await NFTDiscussions.create(obj);
        res.status(200).send();
    }catch(err){
        res.status(500).send({message:err.message, error: err})
    }
}

exports.getNftDiscussions = async (req, res) => {
    const contractAddress= req.body.contract;
    const tokenId = req.body.tokenId;
    const network = req.body.network;

    try{
        const comments = await NFTDiscussions.findAll({where:{NFTContractAddress: contractAddress, TokenId: tokenId, Network: network}});
        res.status(200).send(comments);
    }catch(err){
        res.status(500).send({message:err.message, error: err})
    }
}
exports.createCollectionDiscussions = async (req, res) => {
    const contractAddress= req.body.contract;
    const sender = req.body.sender;
    const network = req.body.network;
    const message = req.body.message;

    const obj = {
        NFTContractAddress: contractAddress,
        SenderAddress: sender,
        Message: message,
        Network: network
    }

    try{
        const comment = await CollectionDiscussions.create(obj);
        res.status(200).send();
    }catch(err){
        res.status(500).send({message: err.message, error: err});
    }
}

exports.getCollectionDiscussions = async (req, res) => {
    const contractAddress= req.body.contract;
    const network = req.body.network;

    try{
        const comments = await CollectionDiscussions.findAll({where:{NFTContractAddress: contractAddress, Network: network}});
        res.status(200).send(comments);
    }catch(err){
        res.status(500).send({message:err.message, error: err})
    }
}