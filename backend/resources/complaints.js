const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintchema = new Schema(
  {
    matchTitle: String,
    reporter: String,
    title: String,
    complaint: String,
  },
  {
    timestamps: true,
  }
);

module.exports = {
  name: "Complaint",
  endpoint: "complaints",
  schema: complaintchema,
};
