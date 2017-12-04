//= ../models/comment-model.js
//= ../models/user-model.js

(function (views, models) {
    views.CommentsView = Backbone.View.extend({
        el: '#comments-wrapper',
        btn: $('#add-comment-btn'),

        initialize: function () {
            this.userModel = new models.UserModel();
            this.userModel.fetch();

            this.btn.on('click', this.addComment.bind(this));
        },

        addComment: function () {
            var message,
                model,
                modelParams;

            message = $('.comment-form__textarea').val();

            if (message.trim()) {
                modelParams = {
                    text: message,
                    author: this.userModel.get('displayName'),
                    date: new Date(),
                    image: this.userModel.get('image')
                };

                model = new  models.CommentModel(modelParams);
                model.save();

                this.createComment(modelParams);
            }
        },

        createComment: function (params) {
            console.log('params',params);
            var html;

            html = "" +
            "<div class='comment'>" +
                "<div class='logo'>" +
                    "<img src='" + params.image.url + "' class='logo__img' />" +
                "</div>" +
                "<div class='comment-details'>>"+
                    "<div class='comment-details__author'>" + params.author + "</div>" +
                    "<div class='comment-details__text'>" + params.text + "</div>" +
                    "<div class='comment-details__date'>" + params.date + "</div>" +
                "</div>" +
            "</div>";

            $('.comment-list').prepend(html);
        }
    });
})(window.app.views, window.app.models);