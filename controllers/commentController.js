const { Comment, User } = require('../models');
const { params } = require('../routes/api/user-routes');



const commentController = {

   getAllComment(req, res) {

        Comment.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });

    },

    
    getCommentById({ params }, res) {

        Comment.findOne({ _id: params.id })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });

    },

    
    createComment({ body }, res) {

        Comment.create(body)
            .then(dbCommentData => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { comments: dbCommentData._id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },

    
    updateComment({ params, body }, res) {

        Comment.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => res.status(400).json(err));

    },

    
    deleteComment({ params }, res) {

        Comment.findOneAndDelete({ _id: params.id })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => res.status(400).json(err));

    }

    
    
    addReaction({ params, body }, res) {

        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $addToSet: { reactions: body } },
            { new: true }
        )

            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
            }
                res.json(dbCommentData);
            })
            .catch(err => res.json(err));
            
    },

   
    removeReaction({ params }, res) {

        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => res.json(err));
    }

};


module.exports = commentController;
