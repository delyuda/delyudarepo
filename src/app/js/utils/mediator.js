(function (utils) {
    var subscribers = {};

    utils.mediator = {

        subscribe: function (event, callback) {
            subscribers[event] = subscribers[event] || [];
            subscribers[event].push(callback);
        },

        unsubscribe: function (event, callback) {
            var subscriberIndex;

            if (!event) {
                subscribers = {};
            } else if (event && !callback) {
                subscribers[event] = [];
            } else {
                subscriberIndex = subscribers[event].indexOf(callback);
                if (subscriberIndex > -1) {
                    subscribers[event].splice(subscriberIndex, 1);
                }
            }
        },

        publish: function (event, data) {
            if (subscribers[event]) {
                subscribers[event].forEach(function (callback) {
                    callback(data);
                });
            }
        }
    };

} (window.app.utils));