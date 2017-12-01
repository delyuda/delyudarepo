var app = {
    models: {},
    collections: {},
    views: {},

    initialize: function () {
        new app.views.CommentsView();
    }
};

//= views/comments-view.js