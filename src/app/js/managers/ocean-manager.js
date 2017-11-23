(function (managers, views, utils, models) {
    managers.OceanManager = OceanManager;

    function OceanManager (options) {
        this.tools = options.tools;
        this.events = options.events;

        this.matrixView = new views.MatrixView(options.matrix);
        this._matrixClickEvent = options.matrix.clickEvent;

        this._nextDayEvent = options.events.nextDayEvent;

        this._currentMode = false;

        this._elemIndex = {
            seaweed: 1,
            fish: 2,
            piranha: 3
        };

        this._elements = {
            seaweed: {},
            fish: {},
            piranha: {}
        };

        this._elemClass = {
            seaweed: models.SeaweedModel,
            fish: models.FishModel,
            piranha: models.PiranhaModel
        };

        this._isStart = false;

        this.initialize();
        this.initEvents();
        this.initListeners();
    }

    OceanManager.prototype = {
        initialize: function () {

        },

        initEvents: function () {
            $(this.tools.matrixBtn).on("click", this.createMatrix.bind(this));

            $(this.tools.addFishBtn).on("click", this.addElemHandler.bind(this, "fish"));
            $(this.tools.addPiranhaBtn).on("click", this.addElemHandler.bind(this, "piranha"));
            $(this.tools.addSeaweedBtn).on("click", this.addElemHandler.bind(this, "seaweed"));

            $(this.tools.nextDayBtn).on("click", this.nextDayHandler.bind(this));
        },

        initListeners: function () {
            utils.mediator.subscribe(this._matrixClickEvent, this.matrixClickHandler.bind(this));

            utils.mediator.subscribe(this.events.moveElemEvent, this.moveElement.bind(this));
            utils.mediator.subscribe(this.events.createElemEvent, this.createElement.bind(this));
            utils.mediator.subscribe(this.events.removeElemEvent, this.removeElement.bind(this));
        },

        createMatrix: function () {
            var matrixParams,
                x,
                y;

            x = $(this.tools.matrixXInput).val();
            y = $(this.tools.matrixYInput).val();

            matrixParams = {
                x: x,
                y: y
            };

            this.matrixView.render(matrixParams);

            this.showTools(this.tools.elemsTools);

            this.clear();
        },

        clear: function () {
            this._elements = {
                seaweed: {},
                fish: {},
                piranha: {}
            };
        },

        showTools: function (elem) {
            $(elem).show(300);
        },

        hideTools: function (elem) {
            $(elem).hide(300);
        },

        addElemHandler: function (elem, e) {
            var btn;

            btn = $(e.target);

            this._currentMode = (this._currentMode === elem) ? false : elem;

            btn.siblings(".btn-warning").removeClass("btn-warning");
            btn.toggleClass("btn-warning");

            if (this._currentMode) {
                this.matrixView.offModifyMode();
                this.matrixView.onModifyMode();
            } else {
                this.matrixView.offModifyMode();
            }
        },

        matrixClickHandler: function (params) {
            var elemParams,
                elemOptions,
                elem;

            if (!params.state) {
                elemParams = {
                    x: params.x,
                    y: params.y,
                    state: this._elemIndex[this._currentMode]
                };

                this.matrixView.setState(elemParams);

                elemOptions = {
                    nextDayEvent: this.events.nextDayEvent,
                    moveElemEvent: this.events.moveElemEvent,
                    removeElemEvent: this.events.removeElemEvent,
                    x: params.x,
                    y: params.y
                };

                elem = new this._elemClass[this._currentMode](elemOptions);

                this._elements[this._currentMode][elem.id] = elem;
            }
        },

        nextDayHandler: function () {
            if (!this._isStart) {
                this.disableTools();
                this.setElemTime();
            }

            this.setElemStates();

            utils.mediator.publish(this.events.nextDayEvent);
        },

        disableTools: function () {

        },

        setElemTime: function () {
            var fishLiveTime,
                fishReprodTime,
                piranhaLiveTime,
                piranhaReprodTime,
                fishParams,
                piranhaParams;

            fishLiveTime = $(this.tools.timeInputs.fishLiveInput).val();
            fishReprodTime = $(this.tools.timeInputs.fishReprodInput).val();
            piranhaLiveTime = $(this.tools.timeInputs.piranhaLiveInput).val();
            piranhaReprodTime = $(this.tools.timeInputs.piranhaReprodInput).val();


            for (var key in this._elements.fish) {
                fishParams = {
                    liveTime: fishLiveTime,
                    reproductionTime: fishReprodTime
                };

                this._elements.fish[key].setTimeParams(fishParams);
            }

            for (var key in this._elements.piranha) {
                piranhaParams = {
                    liveTime: piranhaLiveTime,
                    reproductionTime: piranhaReprodTime
                };

                this._elements.piranha[key].setTimeParams(piranhaParams);
            }
        },

        setElemStates: function () {
            var matrixState;

            matrixState = this.matrixView.getMatrix();

            for (var key in this._elements.fish) {
                this._elements.fish[key].setAroundState(matrixState);
            }

            for (var key in this._elements.piranha) {
                this._elements.piranha[key].setAroundState(matrixState);
            }
        },

        moveElement: function (params) {
            var isFree;

            isFree = this.matrixView.isFreeState(params.moveTo);

            if (isFree) {
                params.currentState.state = this._elemIndex[params.elemName];
                params.moveTo.state = this._elemIndex[params.elemName];

                this.matrixView.removeState(params.currentState);
                this.matrixView.setState(params.moveTo);

                params.callback("ok");
            } else {
                params.callback("error");
            }
        },

        createElement: function (params) {
            var elemParams,
                elemOptions,
                elem;

            elemParams = {
                x: params.x,
                y: params.y,
                state: this._elemIndex[params.elemName]
            };

            this.matrixView.setState(elemParams);

            elemOptions = {
                nextDayEvent: this.events.nextDayEvent,
                moveElemEvent: this.events.moveElemEvent,
                x: params.x,
                y: params.y
            };

            elem = new this._elemClass[params.elemName](elemOptions);

            this._elements[params.elemName][elem.id] = elem;
        },

        removeElement: function (params) {
            console.log('remove',params);
            params.state.state = this._elemIndex[params.elemName];

            this.matrixView.removeState(params.state);
            this._elements[params.elemName][params.id].removeListeners();

            delete this._elements[params.elemName][params.id];
            console.log('this._elements',this._elements);
        },

        getElemName: function (index) {
            var elemName;

            elemName = "";

            for (var key in this._elemIndex) {
                if (this._elemIndex[key] === index) {
                    elemName = key;

                    break;
                }
            }

            return elemName;
        }
    };

})(app.managers, app.views, app.utils, app.models);