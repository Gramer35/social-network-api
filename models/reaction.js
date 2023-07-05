const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            macLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleDateString(),
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

module.exports= reactionSchema;