const mongoose = require("mongoose");
const keys = require("../../config/keys");

const connection = mongoose
  .connect(process.env.MONGOLAB_URI || keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDb Connection established...."))
  .catch(err => console.log("ERROR:" + err));

module.exports = connection;
