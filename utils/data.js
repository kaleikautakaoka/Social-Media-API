const names = ['Sachi', 'Julia', 'Meghan', 'Stephanie', 'Sara', 'Katie', 'Jenny', 'Kelsey', 'Kaitlyn', 'Katherine', 'Kathryn', 'Kathleen', 'Katie', 'K', 'Bev', 'Kelly', 'Jordon', 'Susan', 'Caroline', 'John'];


//get a random name from the array
const getNames = (arr) => arr[Math.floor(Math.random() * arr.length)];


//get a random comment from the array
const getComments = () => `${getNames(names)} ${getNames(names)}`;

//function to get random name from getNames and random comment from getComments
const getRandomNames = (init) => {
    const arrayName = [];
    for (let i = 0; i < 10; i++) {
        arrayName.push(getNames(names));
    }
    return arrayName;
};


module.exports = { getRandomNames, getComments };

