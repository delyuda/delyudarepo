const express = require('express');
const router = express.Router();

const CommentsCtrl = require('./comments.controller');
const commentsCtrl = new CommentsCtrl();

router.route('')
    .get(commentsCtrl.getComments);

module.exports = router;