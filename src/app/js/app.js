var app = {
    models: {},
    views: {},
    managers: {},
    utils: {},

    initialize: function () {
        var options;

        options = {
            matrix: {
                container: ".matrix",
                clickEvent: "matrixClickEvent"
            },
            tools: {
                matrixXInput: "#matrix-horizontal",
                matrixYInput: "#matrix-vertical",
                matrixBtn: ".create-matrix",
                elemsTools: ".elems-tools",
                addFishBtn: ".add-fish-btn",
                addPiranhaBtn: ".add-piranha-btn",
                addSeaweedBtn: ".add-seaweed-btn",
                nextDayBtn: ".next-day-btn"
            },
            events: {
                nextDayEvent: "nextDayEvent",
                moveElemEvent: "moveEvent",
                createElemEvent: "createEvent",
                removeElemEvent: "removeEvent"
            }
        };

        return new app.managers.OceanManager(options);
    }
};