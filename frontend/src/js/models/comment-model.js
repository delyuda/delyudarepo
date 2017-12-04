(function (models) {

    models.CommentModel = Backbone.Model.extend({
        url: '/api/comments',
        author: "",
        text: "",
        image: {
            "url": ""
        }
    }) ;

})(app.models);