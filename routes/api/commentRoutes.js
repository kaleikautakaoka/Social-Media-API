const router = require('express').Router();
const {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require('../../controllers/commentController');

// Set up GET all and POST at /api/comments
router.route('/').get(getComments).post(createComment);

// Set up GET one, PUT, and DELETE at /api/comments/:id
router.route('/:id').get(getCommentById).put(updateComment).delete(deleteComment);


module.exports = router;
