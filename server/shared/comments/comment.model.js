const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    collection: 'Comments'
});

CommentSchema.plugin(deepPopulate);

module.exports = mongoose.model('Comment', CommentSchema);