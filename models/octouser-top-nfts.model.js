const sql = require("sequelize");
const DataTypes = sql.DataTypes;
const OctoUser = require('./octouser.model');

module.exports = (sequelize, Sequelize) => {
  const OctouserNFTS = sequelize.define("octouser_top_nfts", {
    Id: {
      type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false
    },
    NftAddress1: {
      type: DataTypes.STRING, allowNull: true
    },
    NftAddress2: {
        type: DataTypes.STRING, allowNull: true
      },
      NftAddress3: {
        type: DataTypes.STRING, allowNull: true
      },
      UserId:{
        type: DataTypes.INTEGER, allowNull: false
      },
    TokenId1:{
        type: DataTypes.INTEGER , allowNull: true
    },
    TokenId2:{
        type: DataTypes.INTEGER , allowNull: true
    },
    TokenId3:{
        type: DataTypes.INTEGER , allowNull: true
    }
  });
  return OctouserNFTS;
};
