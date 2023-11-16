const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema(
    {

        homeTeam: String,
        awayTeam: String,
        date: {
            type: Date,
            required: true,
        },
        status:{
            type: String,
            enum: [
                "Scheduled",
                "Live",
                "Completed",
                "Cancelled"]
        },
        venue: String,
    },
    {
        timestamps: true,
    }
);

module.exports = { name: "Match", endpoint: 'matches', schema: matchSchema };
