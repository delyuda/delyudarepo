const express = require('express');
const router = express.Router();

const auth = require('../auth/auth');

router.route('')
    .get(function (req, res, next) {
        let code = req.query.code;

        if (code) {
            auth.getToken(code, authorized);

            function authorized (status,token) {
                if (status) {
                    res.cookie('token', token);

                    res.redirect('/');
                } else {
                    res.send('Error');
                }
            }
        } else {
            let authUrl = auth.getAuthUrl();

            res.render('auth', { title: 'Authorization', auth_url: authUrl });
        }
    });

module.exports = router;