(function (managers, views, utils, models) {
    managers.OceanManager = OceanManager;

    function OceanManager (options) {
        this.tools = options.tools;
        this.events = options.events;

        this.matrixView = new views.MatrixView(options.matrix);
        this._matrixClickEvent = options.matrix.clickEvent;

        this._nextDayEvent = options.events.nextDayEvent;

        this.validationModel = new models.ValidationModel();

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

        this._piranhaFood = {
            index: 2,
            name: "fish"
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

            $(this.tools.matrixXInput).on("input", this.isValid.bind(this));
            $(this.tools.matrixYInput).on("input", this.isValid.bind(this));
        },

        initListeners: function () {
            utils.mediator.subscribe(this._matrixClickEvent, this.matrixClickHandler.bind(this));

            utils.mediator.subscribe(this.events.moveElemEvent, this.moveElement.bind(this));
            utils.mediator.subscribe(this.events.createElemEvent, this.createElement.bind(this));
            utils.mediator.subscribe(this.events.removeElemEvent, this.removeElement.bind(this));

            utils.mediator.subscribe(this.events.getElemIdEvent, this.findElemIdByState.bind(this));
        },

        createMatrix: function () {
            var matrixParams,
                x,
                y;

            x = $(this.tools.matrixXInput).val();
            y = $(this.tools.matrixYInput).val();

            if (!x || !y) {
                this.showInputsError([$(this.tools.matrixXInput)[0], $(this.tools.matrixYInput)[0]]);

                return;
            }

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
                    createElemEvent: this.events.createElemEvent,
                    getElemIdEvent: this.events.getElemIdEvent,
                    x: params.x,
                    y: params.y,
                    foodElem: this._piranhaFood
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

            this.setNextDay();
        },

        setNextDay: function () {
            this.setElemStates();

            utils.mediator.publish(this.events.nextDayEvent);
        },

        playHandler: function () {
            if (!this._isStart) {
                this.disableTools();
                this.setElemTime();
            }


        },

        disableTools: function () {

        },

        setElemTime: function () {
            var fishLiveTime,
                fishReprodTime,
                piranhaLiveTime,
                piranhaReprodTime,
                piranhaStarvationTime,
                fishParams,
                piranhaParams;

            fishLiveTime = $(this.tools.timeInputs.fishLiveInput).val();
            fishReprodTime = $(this.tools.timeInputs.fishReprodInput).val();

            piranhaLiveTime = $(this.tools.timeInputs.piranhaLiveInput).val();
            piranhaReprodTime = $(this.tools.timeInputs.piranhaReprodInput).val();
            piranhaStarvationTime = $(this.tools.timeInputs.piranhaStarvInput).val();


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
                    reproductionTime: piranhaReprodTime,
                    starvationTime: piranhaStarvationTime
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
            console.log('createElement',params);
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
                removeElemEvent: this.events.removeElemEvent,
                createElemEvent: this.events.createElemEvent,
                getElemIdEvent: this.events.getElemIdEvent,
                x: params.x,
                y: params.y,
                foodElem: this._piranhaFood
            };

            elem = new this._elemClass[params.elemName](elemOptions);

            this._elements[params.elemName][elem.id] = elem;
        },

        removeElement: function (params) {
            if (!params.state) {
                params.state = this._elements[params.elemName][params.id].getState();
            }

            params.state.state = this._elemIndex[params.elemName];

            this.matrixView.removeState(params.state);
            this._elements[params.elemName][params.id].removeListeners();

            delete this._elements[params.elemName][params.id];
        },

        findElemIdByState: function (params) {
            var elemState,
                elemId;


            for (var key in this._elements[params.elemName]) {
                elemState = this._elements[params.elemName][key].getState();

                if (elemState.x === params.state.x && elemState.y === params.state.y) {
                    elemId = key;

                    break;
                }
            }

            if (params.cb) {
                params.cb(elemId);
            }

            return elemId;
        },

        isValid: function (e) {
            var input,
                value,
                isValid;

            input = $(e.target);
            value = +input.val();

            isValid = this.validationModel.isIntegerPositive(value);

            if (!isValid) {
                this.failInput(input, value);
            }
        },

        failInput: function (input, value) {
            var corrected;

            corrected = parseInt(value) || "";

            input.val(corrected);
        },

        showInputsError: function (inputs) {
            inputs.forEach(function (item) {
                $(item).addClass("has-error");
            });
        }
    };

})(app.managers, app.views, app.utils, app.models);