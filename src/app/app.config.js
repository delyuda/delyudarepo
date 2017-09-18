(function () {
    angular
        .module('angularApp')
        .config(config);

    function config($httpProvider) {
        'ngInject';
        $httpProvider.defaults.withCredentials = false;
    }
})();