const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchReportSchema = new Schema(
  {
    match: {
      type: String,
      ref: "Match",
      required: true,
    },
    summary: String,

    goals: {
      homeTeam: Number,
      awayTeam: Number,
    },
    possession: {
      homeTeam: String,
      awayTeam: String,
    },
    shots: {
      homeTeam: Number,
      awayTeam: Number,
    },
    shotsOnTarget: {
      homeTeam: Number,
      awayTeam: Number,
    },
    fouls: {
      homeTeam: Number,
      awayTeam: Number,
    },
    corners: {
      homeTeam: Number,
      awayTeam: Number,
    },
    offsides: {
      homeTeam: Number,
      awayTeam: Number,
    },


    weatherConditions: String,
    notableEvents: [String],
    durationMinutes: Number,
    venue: String,
    matchOfficials: [
      {
        role: String,
        official: {
          type: String,
          ref: "User",
        },
      },
    ],
    injuries: [
      {
        player: {
          type: String,
          ref: "User",
        },
        description: String,
        minute: Number,
      },
    ],
    complaints: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  name: "MatchReport",
  endpoint: "match-reports",
  schema: matchReportSchema,
};
