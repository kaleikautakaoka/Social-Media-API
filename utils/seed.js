const connection = require('../config/connection');
const { User, Comment } = require('../models');
const { getRandomNames, getComments } = require('./data');

console.log(getRandomNames());

connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.deleteMany({});
    // await Comment.deleteOne({});
    const users = [];

    for (let i = 0; i < 10; i++) {
        const comments = getComments(10);
       

        const user = await User.create({ username: getRandomNames(), comments });
        users.push({user, comments});
    }

// await User.collection.insertMany(users);
// await Comment.collection.insertOne(comments) commentText: getComments(), username: getRandomNames()});
await User.collection.insertMany(users);
await Comment.collection.insertOne({ commentText: 'I had a crazy day today!', username: [...users] });

// console logs and tables for testing

    console.log('all done!');

    console.table(users);
    console.info('Seed data successful!')
    process.exit(0);
}
);


