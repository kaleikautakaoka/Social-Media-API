const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/date');


//schema for comments model name, id_comment, comment_text, createdAt
const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: true,
            validate: [({ length }) => length <= 280, 'Comment must be less than 280 characters.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        // associate comment with user
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

//create a virtual called replyCount that retrieves the length of the comments replies array field on query
commentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});
// create the comment model using the commentSchema
const Comment = model('Comment', commentSchema);

// export the comment model
module.exports = Comment;
