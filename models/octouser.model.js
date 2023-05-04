const sql = require("sequelize");
const DataTypes = sql.DataTypes;

module.exports = (sequelize, Sequelize) => {
  const Octouser = sequelize.define("octouser", {
    Id: {
      type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false
    },
    WalletAddress: {
      type: DataTypes.STRING, unique: true, allowNull: false
    },
    Name: {
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
  });

  return Octouser;
};
