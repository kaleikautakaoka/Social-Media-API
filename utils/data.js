const names = ['Sachi', 'Julia', 'Meghan', 'Stephanie', 'Sara', 'Katie', 'Jenny', 'Kelsey', 'Kaitlyn', 'Katherine', 'Kathryn', 'Kathleen', 'Katie', 'K', 'Bev', 'Kelly', 'Jordon', 'Susan', 'Caroline', 'John'];
const commentDetails = [ 'I like ice cream', 'where can I find the nearest grocey store', 'I am new in town. Looking for friends', 'Where do you bank at and why?', 'Has anyone been to Chilli? Whats your experience?' ]


//get a random name from the array
const getNames = (arr) => arr[Math.floor(Math.random() * arr.length)];


//function to get random name from getNames and random comment from getComments
const getRandomNames = () => {
    `${getNames(names)} ${getNames(names)}`;

    const getRandomComments = (init) => {
        const randoComment = [];
        for (let i = 0; i < init; i++) {
            randoComment.push(getNames(commentDetails)

            );

        };
    }
        return randoComment;
    };


module.exports = { getRandomNames, getRandomComments };

