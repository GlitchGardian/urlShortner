const mongoose = require('mongoose');

async function ConnectToMongo(url) {
    await mongoose.connect(url)
}

module.exports = {
    ConnectToMongo
}