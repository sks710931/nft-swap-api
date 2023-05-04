const dbConfig = {
  HOST: "octoplace.mysql.database.azure.com",
  USER: "octoadmin",
  PASSWORD: "Rachel@12345#",
  DB: "octoplace",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbConfig;
