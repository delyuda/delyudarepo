const Comment = require('./comment.model');

exports.getComments = () => {
    return Comment.find({})
        .then((result) => {
            return result;
        });
};

exports.createComment = (commentBody, author) => {
    return Comment.create(Object.assign({}, commentBody, {
        author: author
    })).then((result) => {
        return result;
    });
};