const sql = require("sequelize");
const DataTypes = sql.DataTypes;

module.exports = (sequelize, Sequelize) => {
  const NFTDiscussion = sequelize.define("nft_discussion", {
    Id: {
      type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false
    },
    TokenId: {
      type: DataTypes.INTEGER, unique: false, allowNull: false
    },
    NFTContractAddress: {
      type: DataTypes.STRING, allowNull: false
    },
    Message: {
        type: DataTypes.STRING, allowNull: true
    },
    Network:{
      type: DataTypes.STRING, allowNull: true
    },
    SenderAddress: {
      type: DataTypes.STRING, allowNull: false
    }
  });

  return NFTDiscussion;
};
