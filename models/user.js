const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

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
        comment: [commentSchema],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
        }
    
);

// get total friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


// create virtual called friendCount that 
const User = model('User', userSchema);

module.exports = User;