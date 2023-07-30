const { User, Comment } = require('../models');


const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'comments',
                select: '-__v'  // exclude the __v field
            })
            .select('-__v') // exclude the __v field
            .sort({ _id: -1 }) // sort by _id DESC
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'  // exclude the __v field
            })
            .select('-__v') // exclude the __v field
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // Otherwise, send the found user
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.updateOne({ _id: params.id }, body)
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // Otherwise, send the found user
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // Otherwise, send the found user
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // Otherwise, send the found user
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // Otherwise, send the found user
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    }
};

module.exports = userController;
