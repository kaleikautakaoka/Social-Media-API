const mongoose = require('mongoose');
// connect mongoose to the mongo db and parse incoming data as json

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media', { useNewUrlParser: true, useUnifiedTopology: true });

//log mongo queries being executed
mongoose.set('debug', true);

module.exports = mongoose.connection;