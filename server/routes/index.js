const express = require('express');
const router = express.Router();

const path = require('path');

const auth = require('../auth/auth');
let commentsService = require('../shared/comments/comments.service');

router.get('/', function(req, res, next) {
    let cookie = req.cookies.token;

    if (cookie) {
        let comments;

        commentsService.getComments()
            .then((result) => {
                console.log('index getcomments result',result);
                let comments = result;

                res.render('index', { title: 'Home', comments: comments});
            });
    } else {
        let authUrl = auth.getAuthUrl();

        res.render('auth', {auth_url: authUrl});
    }
});


module.exports = router;
