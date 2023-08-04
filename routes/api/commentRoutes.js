const router = require('express').Router();
const {
    getAllComment,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    addReaction,
    removeReaction
} = require('../../controllers/commentController');

// Set up GET all and POST at /api/comments
router.route('/').get(getAllComment).post(createComment);

// Set up GET one, PUT, and DELETE at /api/comments/:id
router.route('/:id').get(getCommentById).put(updateComment).delete(deleteComment);


module.exports = router;
