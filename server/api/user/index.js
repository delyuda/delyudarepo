const express = require('express');
const router = express.Router();

const UserCtrl = require('./user.controller');
const userCtrl = new UserCtrl();

router.route('')
    .get(userCtrl.getUserInfo);

module.exports = router;