const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.octousers = require("./octouser.model")(sequelize, Sequelize);
db.octousersTopNfts = require("./octouser-top-nfts.model")(sequelize, Sequelize);
db.marketItems = require("./market-item.model")(sequelize, Sequelize);
module.exports = db;