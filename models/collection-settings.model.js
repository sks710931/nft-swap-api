const sql = require("sequelize");
const DataTypes = sql.DataTypes;

module.exports = (sequelize, Sequelize) => {
  const CollectionSetting = sequelize.define("collection_settings", {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    CollectionAddress: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
    OwnerAddress: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    CollectionName: {
      type: DataTypes.STRING,
    },
    AboutText: {
      type: DataTypes.STRING,
    },
    BannerImage: {
      type: DataTypes.BLOB,
    },
    Avatar: {
      type: DataTypes.BLOB,
    },
    Facebook: {
      type: DataTypes.STRING,
    },
    Twitter: {
      type: DataTypes.STRING,
    },
    Instagram: {
      type: DataTypes.STRING,
    },
    Discord: {
      type: DataTypes.STRING,
    },
    TikTok: {
      type: DataTypes.STRING,
    },
    Youtube: {
      type: DataTypes.STRING,
    },
    Medium: {
      type: DataTypes.STRING,
    },
    Telegram: {
      type: DataTypes.STRING,
    },
    RoyaltyReceiver: {
      type: DataTypes.STRING,
    },
    RoyaltyPercentage: {
        type: DataTypes.STRING
    },
    Network:{
        type: DataTypes.STRING
    }
  });
  return CollectionSetting;
};
