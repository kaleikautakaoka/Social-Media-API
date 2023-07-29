const {connect, connection} = require('mongoose');

const connectMongo = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes';