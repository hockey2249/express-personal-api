  // require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

var db = require('./models/'); 

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

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {

res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/hockey2249/express-personal-api", 
    base_url: "https://immense-springs-36820.herokuapp.com/api", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, 
      {method: "GET", path: "/api/shops/:id", description: "Find One Dispensary"},
      
      {method: "POST", path: "/api/shops", description: "Add a new favorite Dispensary"},
      {method: "PUT", path: "/api/shops/:id", description: "Update One of Your Dispensary"},
      {method: "DELETE", path: "/api/shops/:id", description: "Delete Search for local Dispensaries"}
    ]
  });
});

app.get('/api/profile', function(req, res) {
   db.Profile.find(function(err, profile){
      if (err) { return console.log("index error: " + err); }
      res.json(profile);
  });
});


// get all Dispensary shops 

app.get('/api/shops', function(req, res) {
   db.Shop.find(function(err, shops){
      if (err) { return console.log("index error: " + err); }
      res.json(shops);
  });
});

//find your Dispensary shop
app.get('/api/shops/:id', function (req, res) {
  db.Shop.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});


// create new favorite shop
app.post('/api/shops', function (req, res) {
  var newShop = req.body;
  console.log(newShop);

db.Shop.create(newShop, function(err, shop){
    if (err){
      res.send("Error " + err);
    }
    res.json(shop);
  });
});

//Update a Shop

app.put('/api/shops/:id', function update(req, res) {
  var updateID = req.params.id;
  var update = req.body;
  db.Shop.findOneAndUpdate({_id: updateID}, update, function(err, shop){
    if (err) { return console.log("create error: " + err); }
    res.json(shop);
  });
});

// delete new shop
app.delete('/api/shops/:id', function (req, res) {
  var shopId = req.params.id;
  db.Shop.findOneAndRemove({ _id: shopId }, function (err, deletedShop) {
    res.json(deletedShop);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
