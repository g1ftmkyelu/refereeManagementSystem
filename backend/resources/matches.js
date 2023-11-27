const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema(
    {

        matchTitle: String,
        homeTeam: String,
        awayTeam: String,
        date: {
            type: Date,
            required: true,
        },
        referee: String,
        status: {
            type: String,
            enum: [
                "Scheduled",
                "Live",
                "Completed",
                "Cancelled"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = { name: "Match", endpoint: 'matches', schema: matchSchema };
