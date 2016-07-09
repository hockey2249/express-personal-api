// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/
// connect to db models
// var db = require('./models/');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
//  */

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

app.get('/api/shops', function(req, res) {
    
    db.Shop.find().populate('name')
    .exec(function(err, shops){
      if (err) { return console.log("index error: " + err); }
      res.json(shops);
  });
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/hockey2249/express-personal-api", // CHANGE ME
    base_url: "https://immense-springs-36820.herokuapp.com/api", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "List to all of the dispensary near you"}, // CHANGE ME
      {method: "POST", path: "/api/shops", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
