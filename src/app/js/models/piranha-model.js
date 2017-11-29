(function (models, utils) {
    models.PiranhaModel = PiranhaModel;

    var idIndex = 0;

    function PiranhaModel (options) {
        models.FishModel.apply(this, arguments);

        this.id = "piranha_" + idIndex;
        idIndex += 1;

        this._getElemIdEvent = options.getElemIdEvent;

        this._elemName = "piranha";

        this._foodElem = options.foodElem;
        this._withoutFoodTime = 0;
    }

    PiranhaModel.prototype = Object.create(models.FishModel.prototype);

    PiranhaModel.prototype.setTimeParams = function (params) {
        this._liveTime = params.liveTime;
        this._reproductionTime = params.reproductionTime;
        this._starvationTime = params.starvationTime;
    };

    PiranhaModel.prototype.setAroundState = function () {
        models.FishModel.prototype.setAroundState.apply(this, arguments);

        this._food = this.findFood();

        if (this._food) {
            this.findFoodId();
        }
    };

    PiranhaModel.prototype.nextDay = function () {
        this._time += 1;
        this._withoutFoodTime += 1;

        if (this._time >= this._liveTime || this._withoutFoodTime >= this._starvationTime) {
            this.remove();
        } else if (this._time % this._reproductionTime === 0) {
            this.double();
            this.eat();
        } else {
            this.move();
            this.eat();
        }
    };

    PiranhaModel.prototype.eat = function () {
        var params;

        if (this._food) {
            this._withoutFoodTime = 0;

            params = {
                id: this._food.id,
                elemName: this._foodElem.name
            };

            utils.mediator.publish(this._removeEvent, params);

            this._food = null;
        }
    };

    PiranhaModel.prototype.findFood = function () {
        var self,
            food;

        self = this;

        this._movePriority.every(function (item) {
            if (self._aroundState[item.y][item.x] === self._foodElem.index) {
                food = item;

                return false;
            }

            return true;
        });

        return food;
    };

    PiranhaModel.prototype.findFoodId = function () {
        var params;

        params = {
            state: {
                x: this._state.x + this._food.x - 1,
                y: this._state.y + this._food.y - 1
            },
            elemName: this._foodElem.name,
            cb: this.setFoodId.bind(this)
        };

        utils.mediator.publish(this._getElemIdEvent, params);
    };

    PiranhaModel.prototype.setFoodId = function (id) {
        this._food.id = id;
    };

})(app.models, app.utils);