const path = require('path');

const google = require('googleapis');
const googleAuth = require('google-auth-library');
const plus = google.plus('v1');

const config = require('../config/oauth');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
let SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/plus.me'
];

let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
let TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';


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
            console.log('code',code);
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

            console.log('getprofile response',response);
            cb(true, response);
        });
    }
};

module.exports = oauth;