var express = require('express'),
    app = express();

var bodyParser = require('body-parser');
var fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000);

app.get('/api/task-list', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    fs.readFile(__dirname + '/tasks-data/tasks.json', function(err, data){
        if(err){
            console.error(err);
        }else{
            res.send(data);
        }
    });

});

app.get('/api/task', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    var id = req.query.id;

    fs.readFile(__dirname + '/tasks-data/tasks.json', function(err, data){
        if(err){
            console.error(err);
        }else{
            var taskData;
            var dataStr = new Buffer.from(data, 'base64').toString('ascii');
            var dataArr = JSON.parse(dataStr);

            for (var i = 0; i < dataArr.length; i++) {
                if (dataArr[i].id === +id) {
                    taskData = dataArr[i];

                    break;
                }
            }

            res.send(taskData);
        }
    });

});

app.post('/api/task', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    var id = req.body.id;
    var name = req.body.name;

    fs.readFile(__dirname + '/tasks-data/tasks.json', function(err, data){
        if(err){
            console.error(err);
        }else{
            var taskData;
            var dataStr = new Buffer.from(data, 'base64').toString('ascii');
            var dataArr = JSON.parse(dataStr);

            for (var i = 0; i < dataArr.length; i++) {
                if (dataArr[i].id === +id) {
                    dataArr[i].name = name;

                    taskData = dataArr[i];

                    break;
                }
            }

            var modifiedData = JSON.stringify(dataArr);

            fs.writeFile(__dirname + '/tasks-data/tasks.json', modifiedData);

            res.send(taskData);
        }
    });

});