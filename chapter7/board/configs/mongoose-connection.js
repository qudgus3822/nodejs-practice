const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const uri =
  "mongodb+srv://qudgus3822:!as22414578@cluster0.qv7mr.mongodb.net/nodejs-practice";

module.exports = function () {
  return mongoose.connect(uri, { useNewUrlParser: true });
};
