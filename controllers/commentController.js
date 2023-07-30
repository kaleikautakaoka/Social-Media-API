const { Comment, User } = require('../models')

const commentController = {
    // comments req, res
    getComments(req, res) {
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
            }
            );
    },


    // comments/:id req, res
    getCommentById({ params }, res) {
        Comment.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
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
            }
            );
    },

    // create a new comment params, body, req, res
    createComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.json(dbCommentData);
            }
            )
            .catch(err => res.json(err));
    },

      // update a comment params, body, req, res
      updateComment({ params, body }, res) {
        Comment.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => res.json(err));
    },





    // delete a comment params, req, res
    deleteComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.id })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return res.status(404).json({ message: 'No comment found with this id!' });
                }
            
    //remove id from comments array on user model
    return User.findOneAndUpdate(
        { Comment: params.userId },
        { $pull: { _idid: params.commentId } },
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
})
.catch(err => res.json(err));
    }
};

module.exports = commentController;
