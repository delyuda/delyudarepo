
module.exports = function (app) {
    app.use('/api/comments', require('./comments/index'));
    app.use('/api/user', require('./user/index'));
};