describe("task.service", function () {
    var taskService,
        CONSTS,
        httpMock,
        httpGetMock,
        httpPostMock;


    beforeEach(module('angularApp'));

    beforeEach(function () {
            httpGetMock = jasmine.createSpy('getMock');
            httpPostMock = jasmine.createSpy('postMock');
        });

        beforeEach(module('angularApp', function($provide) {
            httpMock = $provide.value('$http', {
                get: httpGetMock,
                post: httpPostMock
            });
        }));

    beforeEach(
        inject(function($injector) {
            taskService = $injector.get('taskService');
            CONSTS = $injector.get('CONSTS');
        })
    );


    it("taskService defined", function () {
        expect(taskService).toBeDefined();
    });

    describe("#getTaskList", function () {
        it("should call $http.get() with params", function () {
            httpGetMock.and.returnValue({
                then: function (callback){
                    callback({
                        data: {
                            data: []
                        }
                    });
                    return data
                },
                catch: function() {
                    return this;
                }
            });

            taskService.getTaskList();

            expect(httpGetMock).toHaveBeenCalledWith(CONSTS.URLS.TASK_LIST);
        });
    });

    describe("#getTask", function () {
        it("should call $http.get() with params", function () {
            httpGetMock.and.returnValue({
                then: function (callback){
                    callback({
                        data: {
                            data: []
                        }
                    });
                    return data
                },
                catch: function() {
                    return this;
                }
            });

            var params;

            params = {
                id: 1
            };

            taskService.getTask(params);

            expect(httpGetMock).toHaveBeenCalledWith(CONSTS.URLS.TASK, {params: params});
        });
    });


    describe("#updateTask", function () {
        it("should call $http.post() with params", function () {
            httpPostMock.and.returnValue({
                then: function (callback){
                    callback({
                        data: {
                            data: []
                        }
                    });
                    return data
                },
                catch: function() {
                    return this;
                }
            });

            var params;

            params = {
                id: 1,
                name: "test name"
            };

            taskService.updateTask(params);

            expect(httpPostMock).toHaveBeenCalledWith(CONSTS.URLS.TASK, params);
        });
    });

});