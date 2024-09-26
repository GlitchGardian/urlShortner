const mongoose = require('mongoose');

// Define URL schema
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true,
    },
    shortid: {
        type: String,
        require: true,
        unique: true
    },
    count: {
        type: Number
    }
},
    { timestamps: true });

// Create URL model
const urls = mongoose.model('url', urlSchema);

module.exports = urls