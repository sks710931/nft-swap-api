const db = require("../models");
const Octouser = db.octousers;
const Op = db.Sequelize.Op;
const { isAddress } = require("@ethersproject/address");

// Create and Save a new octouser
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
      let user = await Octouser.findOne({ where: { WalletAddress: address } });
      if (user === null) {
        user = await Octouser.create({ WalletAddress: address });
        res.send(user);
      } else {
        res.send(user);
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
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