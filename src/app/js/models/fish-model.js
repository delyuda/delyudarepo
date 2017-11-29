(function (models, utils) {
    models.FishModel = FishModel;

    var idIndex = 0;

    function FishModel (options) {
        this.id = "fish_" + idIndex++;

        this._state = {
            x: options.x,
            y: options.y
        };

        this._nextDayEvent = options.nextDayEvent;
        this._moveEvent = options.moveElemEvent;
        this._createEvent = options.createElemEvent;
        this._removeEvent = options.removeElemEvent;

        this._aroundState = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        this._movePriority = [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 2, y: 1},
            {x: 2, y: 2},
            {x: 1, y: 2},
            {x: 0, y: 2},
            {x: 0, y: 1},
            {x: 0, y: 0}
        ];

        this._movePriorityState = 0;

        this._styleClass = "fish-cell";
        this._elemName = "fish";

        this._time = 0;
        this._liveTime = 0;
        this._reproductionTime = 0;

        this.initListeners();
    }

    var self = {};

    FishModel.prototype = {
        initListeners: function () {
            utils.mediator.subscribe(this._nextDayEvent, this.nextDay.bind(this), this);
            for (var key in this) {
                self[key] = this[key];
            }
        },

        removeListeners: function () {
            utils.mediator.unsubscribe(this._nextDayEvent, this.nextDay.bind(this), this);
        },

        setAroundState: function (matrix) {
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {

                    this._aroundState[i+1][j+1] = (typeof matrix[this._state.y + i] !== "undefined" &&
                            typeof matrix[this._state.y + i][this._state.x + j] !== "undefined") ?
                        matrix[this._state.y + i][this._state.x + j] : -1;
                }
            }
        },

        setTimeParams: function (params) {
            this._liveTime = params.liveTime;
            this._reproductionTime = params.reproductionTime;
        },

        nextDay: function () {
            this._time += 1;

            if (this._time >= this._liveTime) {
                this.remove();
            } else if (this._time % this._reproductionTime === 0) {
                this.double();
            } else {
                this.move();
            }
        },

        move: function () {
            var params,
                freePosition,
                moveTo;

            freePosition = this.getFreePosition("move");
            this.updateMoveState();

            if (freePosition) {
                moveTo = {
                    x: this._state.x + freePosition.x - 1,
                    y: this._state.y + freePosition.y - 1
                };

                params = {
                    elemName: this._elemName,
                    currentState: {
                        x: this._state.x,
                        y: this._state.y
                    },
                    moveTo: {
                        x: moveTo.x,
                        y: moveTo.y
                    },
                    callback: this.moveResultHandler.bind(this, moveTo)
                };

                utils.mediator.publish(this._moveEvent, params);
            }
        },

        getFreePosition: function (type) {
            var self,
                position,
                posArr;

            self = this;

            if (type === "double") {
                posArr = this._movePriority.slice().reverse();
            } else {
                posArr = this._movePriority.slice(this._movePriorityState)
                    .concat(this._movePriority.slice(0,this._movePriorityState));
            }


            posArr.every(function (item) {
                if (self._aroundState[item.y][item.x] === 0) {
                    position = item;

                    return false;
                }

                return true;
            });

            return position;
        },

        moveResultHandler: function (moveTo, result) {
            var aroundPos;

            if (result === "ok") {
                this.setState(moveTo);
            } else {
                aroundPos = {
                    x: moveTo.x - this._state.x + 1,
                    y: moveTo.y - this._state.y + 1
                };
                this._aroundState[aroundPos.y][aroundPos.x] = 1;

                this.move();
            }
        },

        setState: function (params) {
            this._state.x = params.x;
            this._state.y = params.y;
        },

        getState: function () {
            return this._state;
        },

        updateMoveState: function () {
            this._movePriorityState = (this._movePriorityState < this._movePriority.length - 1) ?
                ++this._movePriorityState : 0;
        },

        remove: function () {
            var params;

            params = {
                id: this.id,
                elemName: this._elemName,
                state: this._state
            };

            utils.mediator.publish(this._removeEvent, params);
        },

        double: function () {
            var freePosition,
                params;

            freePosition = this.getFreePosition("double");

            if (freePosition) {
                params = {
                    elemName: this._elemName,
                    x: this._state.x + freePosition.x - 1,
                    y: this._state.y + freePosition.y - 1
                };

                utils.mediator.publish(this._createEvent, params);
            }
        }
    };

})(app.models, app.utils);