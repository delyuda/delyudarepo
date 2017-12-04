const path = require('path');

const google = require('googleapis');
const googleAuth = require('google-auth-library');
const plus = google.plus('v1');

const config = require('../config/oauth');

let SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/plus.me'
];

let clientSecret = config.google.client_secret;
let clientId = config.google.client_id;
let redirectUrl = config.google.redirect_uris[0];

let auth = new googleAuth();
let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

let oauth = {
    getAuthUrl () {
        let authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });

        return authUrl;
    },

    getToken (code, cb) {
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                cb(false);

                return;
            }

            cb(true, JSON.stringify(token));
        });
    },

    getUserProfile: function (token, cb) {
        oauth2Client.credentials = JSON.parse(token);

        plus.people.get({
            userId: 'me',
            auth: oauth2Client
        }, function (err, response) {
            if (err) {
                console.log('Plus People error',err);
                cb(false);

                return;
            }

            cb(true, response);
        });
    }
};

module.exports = oauth;