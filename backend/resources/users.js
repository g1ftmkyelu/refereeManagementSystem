const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userConfig = require("../configs/userConfing");

const schema = new Schema(userConfig, {
  timestamps: true,
});

module.exports = { name: "User", endpoint: "users", schema: schema };
