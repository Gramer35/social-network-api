const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true, 
        minLength: 1, 
        maxLength: 280,
        },
    
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleDateString(),
        },

        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true, 
            virtuals: true,
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema)

module.exports = thought