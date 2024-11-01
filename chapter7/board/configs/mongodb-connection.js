const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://qudgus3822:!as22414578@cluster0.qv7mr.mongodb.net/nodejs-practice";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
