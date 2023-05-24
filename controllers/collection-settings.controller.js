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
      let setting = await Settings.findOne({
        where: { CollectionAddress: address, Network: req.body.network },
      });
      if (setting === null) {
        newSetting = await Settings.create({
          CollectionAddress: address,
          Network: req.body.network,
        });
        res.send(newSetting);
      } else {
        res.send(setting);
      }
    } catch (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Collection Setting.",
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

exports.updateAvatar = async (req, res) => {
  const address = req.body.address;
  if (!address) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const top = {
    Avatar: req.body.avatar,
  };
  try {
    let setting = await Settings.findOne({
      where: { CollectionAddress: address, Network: req.body.network },
    });
    if (setting !== null) {
      let result = await Settings.update(top, {
        where: { CollectionAddress: address, Network: req.body.network },
      });
      res.send(result);
    } else {
      res
        .status(400)
        .send({
          success: false,
          message: "Settings for this collection does not exist",
        });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while updating the collection settings.",
    });
    return;
  }
};

exports.updateBanner = async (req, res) => {
  const address = req.body.address;
  if (!address) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const top = {
    BannerImage: req.body.banner,
  };
  try {
    let setting = await Settings.findOne({
      where: { CollectionAddress: address, Network: req.body.network },
    });
    if (setting !== null) {
      let result = await Settings.update(top, {
        where: { CollectionAddress: address, Network: req.body.network },
      });
      res.send(result);
    } else {
      res
        .status(400)
        .send({
          success: false,
          message: "Settings for this collection does not exist",
        });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while updating the collection settings.",
    });
    return;
  }
};
exports.update = async (req, res) => {
  const settingObj = {
    Id: req.body.id,
    CollectionName: req.body.name,
    AboutText: req.body.aboutText,
    Facebook: req.body.facebook,
    Twitter: req.body.twitter,
    Instagram: req.body.instagram,
    Discord: req.body.discord,
    TikTok: req.body.tikTok,
    Youtube: req.body.youtube,
    Medium: req.body.medium,
    Telegram: req.body.telegram,
  };
  try {
    let user = Settings.update(settingObj, {
      where: { CollectionAddress: req.body.address, Network: req.body.network },
    });
    res.send({
      data: user,
      message: "Collection Settings Updated Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the collection settings.",
    });
    return;
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    let users = await Settings.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retreiving the Collection Settings.",
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
    let user = await Settings.findOne({ where: { CollectionAddress: address, Network: req.body.network } });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the collection setting.",
    });
    return;
  }
};
