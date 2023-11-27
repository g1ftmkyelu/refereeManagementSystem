const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema({
  player: String,
  match: String,
  description: String,
  minute: Number,

}, {
  timestamps: true,
});

module.exports = { name: "Injury", endpoint: "injuries", schema: schema };
