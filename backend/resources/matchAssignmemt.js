const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchAssignmentSchema = new Schema(
    {
        match: {
            type: String,
            required: true,
        },
        assignee: {
            type: String,
            required: true,
        },
     
    },
    {
        timestamps: true,
    }
);

module.exports = { name: "MatchAssignment", endpoint: 'match-assignments', schema: matchAssignmentSchema };
