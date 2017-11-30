const Comment = require('./comment.model');

exports.getComments = () => {
    console.log('getCOmments');

    return Comment.find({})
        .then((result) => {
            console.log('getComments result',result);
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