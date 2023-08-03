const { model } = require('mongoose');
const { Comment, User } = require('../models')

model.exports = {
    //get all comments
    async getComments(req, res) {
        try {
            const dbCommentData = await Comment.find();
            res.json(dbCommentData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    //get one comment by id
    async getCommentById({ params }, res) {
        try {
            const dbCommentData = await Comment.findById(params.id);
            res.json(dbCommentData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    //create a comment
    async createComment( req, res) {
        try {
            const dbCommentData = await Comment.create(req.body);
            const post = await Post.findOneAndUpdate(
                { _id: req.body.postId },
                { $push: { comments: dbCommentData._id } },
                { new: true }
            );

            if (!post) {
                res.status(404).json({ message: 'No post found with this id!' });
            }

            res.json({ message: 'Comment created!' });
        } catch (err) {
            
        }
    },
}


module.exports = commentController;
