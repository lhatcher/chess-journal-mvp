var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
var file = "db/test.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

app.use(express.static('../'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// db.serialize(function() {
//   // if ( !exists ) {
//   //   db.run('CREATE TABLE Stuff (thing TEXT)');
//   // }
//
//   var stmt = db.prepare("INSERT INTO things VALUES (1, 'test')");
//
//  //Insert random data
//   var rnd;
//   for (var i = 0; i < 10; i++) {
//     rnd = Math.floor(Math.random() * 10000000);
//     stmt.run("Thing #" + rnd);
//   }
//
// stmt.finalize();
// });

app.post('/api/test', function (req, res) {
  console.log('testing!!!');
  console.log(req.body.moveLog);
})

app.listen(8080)
