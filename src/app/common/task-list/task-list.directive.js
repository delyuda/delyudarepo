(function () {
    angular
        .module('angularApp')
        .directive('taskList', taskList);

    function taskList() {
        return {
            restrict: 'E',
            templateUrl: 'common/task-list/task-list.html',
            scope: {},
            controller: 'TaskListController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();