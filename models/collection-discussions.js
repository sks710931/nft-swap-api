const sql = require("sequelize");
const DataTypes = sql.DataTypes;

module.exports = (sequelize, Sequelize) => {
  const CollectionDiscussion = sequelize.define("collection_discussion", {
    Id: {
      type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false
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

  return CollectionDiscussion;
};
