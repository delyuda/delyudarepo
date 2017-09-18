(function () {
    'use strict';
    angular
        .module('angularApp')
        .controller('TaskController', TaskController);

    function TaskController ($log, taskService, $routeParams) {
        'ngInject';

        var vm = this;

        vm.taskId = $routeParams.id;
        vm.task = {};

        vm.isNameEditable = false;
        vm.isDescrEditable = false;

        vm.updateName = updateName;
        vm.resetName = resetName;


        loadTask();

        function loadTask () {
            var params;

            params = {
                id: vm.taskId
            };

            return taskService.getTask(params)
                .then(setTask, errorHandler);
        }

        function setTask (data) {
            vm.task = data.data;
            vm.defaultName = vm.task.name;

            return vm.task;
        }

        function errorHandler (error) {
            $log.log('error', error);
        }

        function updateName () {
            var params;

            vm.isNameEditable = false;

            params = {
                id: vm.task.id,
                name: vm.task.name
            };

            return taskService.updateTask(params)
                .catch(errorHandler);
        }

        function resetName () {
            vm.task.name = vm.defaultName;

            vm.isNameEditable = false;
        }
    }
})();