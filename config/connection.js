const mongoose = require('mongoose');

const mongoConnect = process.env.MONGODB_URI || 'mongodb:localhost:27017/socialNetworkAPI'

mongoose.connect(mongoConnect);

module.exports = mongoose.connection;