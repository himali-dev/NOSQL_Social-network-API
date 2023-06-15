const { Schema, model } = require('mongoose');

// Reaction will be used as subdocument in thought model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()

        },
        reactionBody: {
            type: String,
            required:true,
            maxlength: 280

        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a')

        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



// Thought model schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a')

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//  `reactionCount` virtual that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual(`reactionCount`).get(function () {
    return this.reactions.length;
});

// Initialize Post model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
