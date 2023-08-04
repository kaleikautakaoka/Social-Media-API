const { Schema, model, types } = require('mongoose');
const dateFormat = require('../utils/date');



const commentSchema = new Schema(

    {
        commentText: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        
        username: {
            type: String,
            required: true
        }
    },

    {

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'

          }]

    },
    {

        toJSON: {
            virtuals: true,
            getters: true
        },

        id: false
    }

);


// reaction schema
const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        
        username: {
            type: String,
            required: true
        },
        
        toJSON: {
                getters: true
            },

        }
        
    
    );
    
    //create a virtual called replyCount that retrieves the length of the comments replies array field on query
    commentSchema.virtual('reactionCount').get(function () {
        return this.reaction.length;
    });


const Comments = model('comments', commentSchema);



module.exports = Comments;
