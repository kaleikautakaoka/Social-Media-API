const { Schema, model } = require('mongoose');
const commentSchema = require('./comments');

// create the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'You need to provide an email address!',
            unique: true,
            match: [/.+@.+\..+/]
        },

        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
       
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        
        toJSON: {
            virtuals: true
        }
        
    }

    
);

// get total friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('User', userSchema);

module.exports = User;