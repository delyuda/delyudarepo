(function () {
    'use strict';
    angular
        .module('angularApp')
        .controller('TaskListController', TaskListController);

    function TaskListController ($log, taskService) {
        'ngInject';

        var vm = this;

        vm.taskList = {};
        loadTaskList();

        function loadTaskList () {
            return taskService.getTaskList()
                .then(setTaskList, errorHandler);
        }

        function setTaskList (data) {
            vm.taskList = data.data;
            return vm.taskList;
        }

        function errorHandler (error) {
            $log.log('error', error);
        }
    }
})();