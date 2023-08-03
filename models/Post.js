const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    
    {
        postText: String,
        username: String,
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
}
);

const Post = model('Post', postSchema);

module.exports = Post;