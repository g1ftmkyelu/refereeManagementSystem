const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema({
    player: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    card: {
        type: String,
        enum: ['yellow', 'red'] 
    },
    matchId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = { name: "Foul", endpoint: "fouls", schema: schema };
