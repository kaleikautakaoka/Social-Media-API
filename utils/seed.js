const connection = require('../config/connection');
const { User, Comment } = require('../models');
const getNames = require('./data');

console.log(getNames());

connection.once('open', async () => {
    await Comment.deleteMany({});
    await User.deleteMany({});

    const users = await User.insertMany(getNames());

    console.log('all done!');
    process.exit(0);
}
);


