(function () {
    'use strict';
    var baseUrl = 'http://localhost:8000/api/';
    var taskList = 'task-list';
    var task = 'task';

    var URLS = {
        BASE_URL: baseUrl,
        TASK_LIST: baseUrl + taskList,
        TASK: baseUrl + task
    };

    var CONSTS = {
        URLS: URLS
    };

    angular
        .module('angularApp')
        .constant('CONSTS', CONSTS);

})();
