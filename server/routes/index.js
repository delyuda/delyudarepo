const express = require('express');
const router = express.Router();

const path = require('path');

const auth = require('../auth/auth');
let commentsService = require('../shared/comments/comments.service');

router.get('/', function(req, res, next) {
    let cookie = req.cookies.token;

    if (cookie) {
        commentsService.getComments()
            .then((result) => {
                res.render('index', { title: 'Home', comments: result});
            });
    } else {
        let authUrl = auth.getAuthUrl();

        res.render('auth', {title: 'Authorization', auth_url: authUrl});
    }
});


module.exports = router;
