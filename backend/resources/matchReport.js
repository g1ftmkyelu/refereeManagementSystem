const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchReportSchema = new Schema(
  {
    matchTitle:String,
    summary: String,
    homeTeamGoals: {
      type: Number,
      default: 0,
      required:false
    },
    awayTeamGoals: {
      type: Number,
      default: 0,
      required:false
    },
    homeTeamPossession: {
      type: Number,
      default: 0,
      required:false
    },
    awayTeamPossession: {
      type: Number,
      default: 0,
      required:false
    },

    homeTeamShots: {
      type:Number,
      default: 0,
      required:false
    },
    awayTeamShots: {
      type:Number,
      default: 0,
      required:false
    },

    homeTeamFouls:  {
      type:Number,
      default: 0,
      required:false
    },
    awayTeamFouls:  {
      type:Number,
      default: 0,
      required:false
    },
    homeTeamYellowCards:  {
      type:Number,
      default: 0,
      required:false
    },
    awayTeamYellowCards:  {
      type:Number,
      default: 0,
      required:false
    },

    homeTeamRedCards:  {
      type:Number,
      default: 0,
      required:false
    },
    awayTeamRedCards:  {
      type:Number,
      default: 0,
      required:false
    },

    homeTeamCorners: {
      type:Number,
      default: 0,
      required:false
    },

    awayTeamCorners:  {
      type:Number,
      default: 0,
      required:false
    },

    homeTeamOffsides: {
      type:Number,
      default: 0,
      required:false
    },
    awayTeamOffsides: Number,
    weatherConditions: String,
    notableEvents: [String],
    durationMinutes: Number,

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
