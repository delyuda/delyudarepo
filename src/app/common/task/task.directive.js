(function () {
    angular
        .module('angularApp')
        .directive('task', task);

    function task() {
        return {
            restrict: 'E',
            templateUrl: 'common/task/task.html',
            scope: {},
            controller: 'TaskController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();