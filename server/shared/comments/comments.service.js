const Comment = require('./comment.model');

exports.getComments = () => {
    return Comment.find({})
        .then((result) => {
            return result;
        });
};

exports.createComment = (commentBody, author, image) => {
    return Comment.create(Object.assign({}, {
        text: commentBody,
        author: author || 'Noname',
        image: image
    })).then((result) => {
        return result;
    });
};