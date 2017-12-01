(function (app) {
    app.views.CommentsView = Backbone.View.extend({
        el: '#comments-wrapper',
        btn: $('#add-comment-btn'),

        initialize: function () {
            console.log('init comments view');
            console.log('this.btn',$('#add-comment-btn'));
            $('#add-comment-btn').on('click', this.addComment);
        },

        addComment: function () {
            console.log('click');
        }
    });
})(window.app);