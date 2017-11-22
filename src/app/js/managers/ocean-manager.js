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
                console.log('this._currentMode',this._currentMode);
                console.log("elemParams",elemParams);

                this.matrixView.setState(elemParams);

                elemOptions = {
                    nextDayEvent: this.events.nextDayEvent,
                    moveElemEvent: this.events.moveElemEvent,
                    x: params.x,
                    y: params.y
                };

                elem = new this._elemClass[this._currentMode](elemOptions);
                console.log('elem.id',elem.id);

                this._elements[this._currentMode][elem.id] = elem;
                console.log('this._elements',this._elements);
            }
        },

        nextDayHandler: function () {
            this.disableTools();

            this.setElemStates();

            utils.mediator.publish(this.events.nextDayEvent);
        },

        disableTools: function () {

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
                this.matrixView.removeState(params.currentState);
                this.matrixView.setState(params.moveTo);

                params.callback("ok");
            } else {
                params.callback("error");
            }
        }
    };

})(app.managers, app.views, app.utils, app.models);