// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

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
      {method: "POST", path: "/api/shops", description: "Add a new favorite Dispensary"},
      {method: "GET", path: "/api/shops/:id", description: "Find One Dispensary"},
      {method: "DELETE", path: "/api/shops/:id", description: "Delete Search for local Dispensaries"}
    ]
  });
});


//get all profile info
// app.get('/api/profile', function index(req, res) {
//   res.json({ profile: profile });
// });

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
  var newShop = new db.Shop({
  name: req.body.name,
  address: req.body.address,
  website: req.body.website,
  phone: req.body.phone,
  });
  newShop.save(function saveShop(err, savedShop) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(savedShop);
    }
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
