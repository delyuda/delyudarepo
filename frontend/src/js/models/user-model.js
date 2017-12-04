(function (models) {

    models.UserModel = Backbone.Model.extend({
        url: '/api/user',
        displayName: "",
        image: {
            url: ""
        }
    });

})(app.models);