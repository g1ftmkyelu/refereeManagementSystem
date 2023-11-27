const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {

        matchTitle: String,
        reporter: String,
        complaint:String,
    },
    {
        timestamps: true,
    }
);

module.exports = { name: "MatchComplaint", endpoint: 'matches-complaints', schema: mySchema };
