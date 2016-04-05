var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
// var file = "db/test.db";
// var exists = fs.existsSync(file); // boolean

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(file);

app.use(express.static('../'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/saveGame', function (req, res) {
  saveData(req.body.moveLog, 'filename');
  res.send(200);
});

app.get('/api/loadGame', function (req, res) {

});

app.listen(8080);

var saveData = function(logArray, filename) {
  fs.writeFile('db/logs/' + filename + '.json', JSON.stringify(logArray), function(err){
    if (err) console.error(err);
  });
};
