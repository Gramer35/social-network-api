const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(email) {
                    return /^([a-zA-z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,4})$/.test(email);
                }
            }
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', userSchema)

module.exports = User