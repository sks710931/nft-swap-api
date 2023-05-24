const db = require("../models");
const Settings = db.collectionSettings;
const Op = db.Sequelize.Op;
const { isAddress } = require("@ethersproject/address");

// Create and Save a new collection setting
exports.create = async (req, res) => {
  const address = req.body.address;
  if (!req.body.address) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (isAddress(address)) {
    try {
      let setting = await Settings.findOne({ where: { CollectionAddress: address, Network:req.body.network } });
      if (setting === null) {
        newSetting = await Settings.create({ CollectionAddress: address, Network:req.body.network });
        res.send(newSetting);
      } else {
        res.send(setting);
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Collection Setting.",
      });
      return;
    }
  } else {
    res.status(500).send({
      message: "Invalid Address",
    });
    return;
  }
};

exports.createTopNFTs= async (req, res) => {
  const userId = req.body.userId;
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
 
  const top = {
    NftAddress1: req.body.nftAddress1,
    NftAddress2: req.body.nftAddress2,
    NftAddress3: req.body.nftAddress3,
    TokenId1: req.body.tokenId1,
    TokenId2: req.body.tokenId2,
    TokenId3: req.body.tokenId3,
    UserId: req.body.userId
  };
    try {
      let nfts = await TopNfts.findOne({ where: { UserId: userId } });
      if (nfts === null) {
        nfts = await TopNfts.create(top);
        res.send(nfts);
      } else {
        res.send(nfts);
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user top nfts.",
      });
      return;
    }
  
  
};
exports.update = async (req, res) => {
  const userObj = {
    Id: req.body.id,
    WalletAddress: req.body.address,
    Name: req.body.name,
    AboutText: req.body.aboutText,
    Facebook: req.body.facebook,
    Twitter: req.body.twitter,
    Instagram: req.body.instagram,
    Discord: req.body.discord,
    TikTok: req.body.tikTok,
    Youtube: req.body.youtube,
    Medium: req.body.medium,
    BannerImage: req.body.bannerImage,
    Avatar: req.body.avatar,
  };
  try {
    let user = Octouser.update(userObj,{where:{WalletAddress: req.body.address}});
    res.send({
        data: user,
        message: "User Updated Successfully!"
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the user.",
    });
    return;
  }
};

exports.updateTopNfts = async (req, res) => {
  const top = {
    NftAddress1: req.body.nftAddress1,
    NftAddress2: req.body.nftAddress2,
    NftAddress3: req.body.nftAddress3,
    TokenId1: req.body.tokenId1,
    TokenId2: req.body.tokenId2,
    TokenId3: req.body.tokenId3,
    UserId: req.body.userId
  };
  try {
    let nfts = TopNfts.update(top,{where:{UserId: req.body.userId}});
    res.send({
        data: nfts,
        message: "User Updated Successfully!"
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the user top nfts.",
    });
    return;
  }
};
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    let users = await Octouser.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retreiving the users.",
    });
    return;
  }
};

// Find a single Octouser with address
exports.findOne = async (req, res) => {
  const address = req.body.address;
  if (!req.body.address) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    let user = await Octouser.findOne({ where: { WalletAddress: address } });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
    return;
  }
};

exports.findUserTopNfts = async (req, res) => {
  const userId = req.body.userId;
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    let nfts = await TopNfts.findOne({ where: { UserId: userId } });
    res.send(nfts);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the user nfts.",
    });
    return;
  }
}

exports.delete = async (req,res) => {
    try{
      const result =   await Octouser.destroy({where: {WalletAddress: req.body.address}});
      if(result ==1){
        res.send({message:"User deleted successfully!"});
      }else{
        res.status(404).send({message: "User not found!"});
      }
    }catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the user.",
    });
    return;
  }
}