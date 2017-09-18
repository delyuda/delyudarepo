(function () {
    angular
        .module('angularApp')
        .config(provider);

    function provider($routeProvider) {
        'ngInject';

        $routeProvider
            .when('/', {
                templateUrl: 'screens/home.html'
            })
            .when('/task/:id', {
                templateUrl: 'screens/task.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
