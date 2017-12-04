let commentService = require('../../shared/comments/comments.service');

class CommentsController {
    getComments () {

    }

    addComment (req, res, next) {
        let text = req.body.text;
        let author = req.body.author;
        let image = req.body.image;

        commentService.createComment(text, author, image)
            .then( (result) => {
                res.send(result);
            });
    }
}

module.exports = CommentsController;