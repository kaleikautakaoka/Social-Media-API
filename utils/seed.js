const connection = require('../config/connection');
const { User, Comments } = require('../models');
const { getRandomNames, getRandomComments } = require('./data');

console.log(getRandomNames());
console.log(getRandomComments());

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to database');
    await User.deleteMany({});
    await Comments.deleteMany({});
    const genUserName = [];

    for (let i = 0; i < 10; i++) {
        const commentText = getRandomComments(10);
       
        const username = getRandomNames();

        genUserName.push({ commentText, username});
    }
      

// await User.collection.insertMany(users);
// await Comment.collection.insertOne(comments) commentText: getComments(), username: getRandomNames()});
await User.collection.insertMany(users);
await Comments.collection.insertMany(commentText);

// console logs and tables for testing

    console.log('all done!');

    console.table(genUserName);
    console.info('Seed data successful!')
    process.exit(0);
}
);


