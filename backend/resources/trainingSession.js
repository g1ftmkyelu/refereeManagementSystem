const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    refereeName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    performance: {
        type: Number,
        min: 0,
        max: 10
    },
    cardioFitness: {
        type: Number,
        min: 0,
        max: 10
    },
    strength: {
        type: Number,
        min: 0,
        max: 10
    },
    flexibility: {
        type: Number,
        min: 0,
        max: 10
    },
    agility: {
        type: Number,
        min: 0,
        max: 10
    },
    endurance: {
        type: Number,
        min: 0,
        max: 10
    },
    balance: {
        type: Number,
        min: 0,
        max: 10
    },
    speed: {
        type: Number,
        min: 0,
        max: 10
    },
    power: {
        type: Number,
        min: 0,
        max: 10
    },
    coordination: {
        type: Number,
        min: 0,
        max: 10
    },
    observation: String,
});

module.exports = { name: "TrainingSessions", endpoint: "training-sessions", schema: Schema };
