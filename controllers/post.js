const { Post } = require('../models');

module.exports = {
    //get all posts with async/await
    async getAllPosts(req, res) {
        try {
            const dbPostData = await Post.find();
            res.json(dbPostData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //get one post by id with async/await
    async getPostById(req, res) {
        try {
            const dbPostData = await Post.findById({_id: req.params.postId});

            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
            }
            res.json(dbPostData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a post with async/await
    async createPost(req, res) {
        try {
            const dbPostData = await Post.create(req.body);
            res.json(dbPostData);
        } catch (err) {
            res.status(500).json(err);

        }
            
        }
    }