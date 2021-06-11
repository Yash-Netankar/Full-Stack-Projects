const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    mname: {
        type: String,
        required: true
    },
    mlanguage: {
        type: String,
        required: true
    },
    mrelease: {
        type: Date,
        required: true
    },
    mbudget: {
        type: Number,
        required: true
    },
    mcollection: {
        type: Number,
        required: true
    }
});

const model = mongoose.model('Movie', MovieSchema);

module.exports = model;