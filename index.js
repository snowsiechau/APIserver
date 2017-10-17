var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Girl = require('./models/girl');

var app = express();
app.use(bodyParser.json());
//  mongodb://<dbuser>:<dbpassword>@ds121945.mlab.com:21945/hot-girls

// 1. connect
var mlabUri = "mongodb://admin:admin@ds121945.mlab.com:21945/hot-girls"
mongoose.connect(mlabUri, {useMongoClient: true});

// 2. dump data
// var girl = new Girl({
//     name:"1",
//   image:"https://scontent.fhan2-2.fna.fbcdn.net/v/t31.0-8/12890986_1007583079332583_585328398187296227_o.jpg?oh=65fd76b666d19c50bbdbed5d7aee8824&oe=5A66A4C0",
//   yob: 1995
// });
//
// girl.save();

// 3. use in GET/girls


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api', function(request, response){
  response.json({hello: 'world'});
});

app.get('/api/girls', function(request, response){
  Girl.find(
    {},
    function(err, girls){
      if (err) {
        response.json({sucess: 0, data: null});
      }
      else {
        response.json({sucess: 1, data: girls});
      }
    }
  );
});

app.post('/api/girls', function(req, res){
  var body = req.body;

  var name = body.name;
  var image = body.image;
  var yob = body.yob;

  var girl = new Girl({
    name,
    image,
    yob
  });

  girl.save(function(err, savedGril){
    if (err) {
      res.json({sucess: 0, data: null, message: "Error in save" + err});
    }else {
      res.json({sucess: 1, data: savedGril});
    }
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
