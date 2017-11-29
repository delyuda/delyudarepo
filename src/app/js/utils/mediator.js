(function (utils) {
    var subscribers = {};
    var contexts = {};

    utils.mediator = {

        subscribe: function (event, callback, context) {
            subscribers[event] = subscribers[event] || [];
            subscribers[event].push(callback);

            if (context) {
                contexts[event] = contexts[event] || [];
                contexts[event][subscribers[event].length - 1] = context;
            }
        },

        unsubscribe: function (event, callback, context) {
            var subscriberIndex;

            if (!event) {
                subscribers = {};
            } else if (event && !callback) {
                subscribers[event] = [];
            } else {
                if (context) {
                    for (var i = 0; i < subscribers[event].length; i++) {
                        if (subscribers[event][i].name === callback.name &&
                            subscribers[event][i].toString() === callback.toString() &&
                            contexts[event][i] === context) {

                            subscriberIndex = i;

                            break;
                        }
                    }
                } else {
                    subscriberIndex = subscribers[event].indexOf(callback);
                }

                if (subscriberIndex > -1) {
                    subscribers[event].splice(subscriberIndex, 1);

                    if (context) {
                        contexts[event].splice(subscriberIndex, 1);
                    }
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