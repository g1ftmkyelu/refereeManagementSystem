const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    players: [{ type: String }],
    coach: { type: String },
    logo: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = { name: "Team", endpoint: "teams", schema: teamSchema };
