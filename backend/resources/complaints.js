const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintchema = new Schema(
  {
    complainer: {
      type: String,
      required: true,
    },
    complainee: {
      type: String,
      required: true,
    },
    complaint: { type: String },
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
