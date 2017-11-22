(function (models) {
    models.PiranhaModel = PiranhaModel;

    var idIndex = 0;

    function PiranhaModel (options) {
        models.FishModel.apply(this, arguments);

        this.id = "piranha_" + idIndex;
        idIndex += 1;

        this._stateIndex = 3;
    }

    PiranhaModel.prototype = Object.create(models.FishModel.prototype);

})(app.models);