let auth = require('../../auth/auth');

class CommentsController {
    getUserInfo (req, res, next) {
        let token = req.cookies.token;

        auth.getUserProfile(token, cb);

        function cb (status, response) {
            if (status) {
                res.send(response);
            } else {
                res.redirect('/');
            }
        }
    }
}

module.exports = CommentsController;