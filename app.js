const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const marketplaceRouter = require('./routes/market');
const nftRouter = require('./routes/nft');
const collectionSettingsRouter = require('./routes/collection-setting');
const analyticsRouter = require('./routes/analytics');
const discussionsRouter = require('./routes/discussions');
const db = require("./models/index");
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: false, limit:"50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/nft', nftRouter);
app.use("/collection-setting", collectionSettingsRouter)
app.use('/discussions', discussionsRouter);
app.use('/analytics', analyticsRouter);
module.exports = app;
