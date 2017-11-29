(function (models) {
    models.ValidationModel = ValidationModel;

    function ValidationModel () {

    }

    ValidationModel.prototype = {
        isIntegerPositive: function (value) {
            return (value > 0);
        }
    };

})(app.models);