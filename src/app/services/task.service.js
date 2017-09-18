(function () {
    'use strict';
    angular
        .module('angularApp')
        .factory('taskService', taskService);

    function taskService($http, CONSTS, $log) {
        'ngInject';

        return {
            getTaskList: getTaskList,
            getTask: getTask,
            updateTask: updateTask
        };

        function getTaskList () {
            return $http.get(CONSTS.URLS.TASK_LIST)
                .catch(errorHandler);
        }

        function getTask (params) {
            return $http.get(CONSTS.URLS.TASK, {params: params})
                .catch(errorHandler);
        }

        function updateTask (params) {
            return $http.post(CONSTS.URLS.TASK, params)
                .catch(errorHandler);
        }

        function errorHandler (error) {
            $log.error(error);
        }
    }

})();