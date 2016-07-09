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

var profile = [
  {
  name: 'Kyle Gibons',
  github_link: 'https://github.com/hockey2249/express-personal-api',
  github_profile_image: '',
  current_city: 'Denver, CO',
  pets: [
    {name: 'Simba', type: 'Dog', breed: 'Golden Retriver'},
 ],
  family_members: [
      {name: 'Kayla', relationship: 'Sister'},
      {name: 'James', relationship: 'Dad'},
      {name: 'Kathy', relationship: 'Mother'}
]
}
];

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
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/hockey2249/express-personal-api", 
    base_url: "https://immense-springs-36820.herokuapp.com/api", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, 
      {method: "POST", path: "/api/shops", description: "Find a local Dispensary"}, 

      {method: "POST", path: "/api/shops", description: "Add 90s One Hit Wonders"},
      {method: "GET", path: "/api/shops/:id", description: "Get one song"},
      {method: "DELETE", path: "/api/shops/:id", description: "Delete one song"}
    ]
  });
});


//get all profile info
app.get('/api/profile', function index(req, res) {
  // send all todos as JSON response
  res.json({ profile: profile });
});


// get all weed shops 

app.get('/api/shops', function(req, res) {
   db.Shop.find(function(err, shops){
      if (err) { return console.log("index error: " + err); }
      res.json(shops);
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
