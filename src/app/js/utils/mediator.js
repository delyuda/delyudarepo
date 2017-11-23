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
                console.log('callback',callback.BoundThis);
                console.log('subscribers[event]',subscribers[event]);
                console.log('subscribers[event][0].arguments',subscribers[event][0].BoundThis);

                console.log('=',subscribers[event][0] === callback);
                subscriberIndex = subscribers[event].indexOf(callback);



                console.log('subscriberIndex',subscriberIndex);
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