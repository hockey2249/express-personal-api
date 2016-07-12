// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var shop_list = [
  {
    name: "The Giving Tree of Denver",
    address: "2707 W 38th Ave, Denver, CO 80211",
    website: "http://www.tgtree.com",
    phone: 3034778888,
  },
   {
    name: "Urban Dispensary",
    address: "2675 W 38th Ave, Denver, CO 80211",
    website: "http://www.urbandispensary.com",
    phone: 7203899179,
  },
  {
    name: "Pure Marijuana Dispensary",
    address: "1133 Bannock St, Denver, CO 80204",
    website: "http://puremmj.com/",
    phone: 3035347873,
  },
   {
    name: "Denver Relief",
    address: "1 Broadway A150, Denver, CO 80203",
    website: "http://www.denverrelief.com/",
    phone: 3034206337,
  },
    {
    name: "AMCH - Alternative Medicine on Capitol Hill",
    address: "1301 Marion St, Denver, CO 80211",
    website: "http://www.amchdenver.com/",
    phone: 7209610560,
  },
   {
    name: "La Conte's Clone Bar and Dispensary",
    address: "105 E 7th Ave, Denver, CO 80203",
    website: "http://www.lacontesclonebar.com/",
    phone: 3032922252,
  }];

db.Shop.remove({}, function(err, shops){
   if(err) {
    console.log('Error occurred in remove', err);
   } else {
     console.log('removed shop');
    db.Shop.create(shop_list, function(err, shops){
  if (err) { return console.log('err', err); }
    console.log("created", db.Shop.length, "shops");
    process.exit();
  });
  }
});

var profilelist = [
  {
  name: 'Kyle Gibons',
  github_link: 'https://github.com/hockey2249/express-personal-api',
  github_profile_image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAXzAAAAJDVmZjY4OGYwLTcyOGMtNDY1OS05NTUyLWYxYWY2YTY5OTgwMA.jpg',
  current_city: 'Denver, CO',
  family_members: [
      {name: 'Kayla', relationship: 'Sister'},
      {name: 'James', relationship: 'Dad'},
      {name: 'Kathy', relationship: 'Mother'}
    ],
  pet: [
    {name: 'Simba', breed: 'German Shepard'},
 ],
  }
];

db.Profile.remove({}, function(err, profiles){
   if(err) {
    console.log('Error occurred in remove', err);
   } else {
     console.log('removed profile');

db.Profile.create(profilelist, function(err, profiles){
  if (err) { return console.log('err', err); }
    console.log("created", db.Profile.length, "profiles");
    process.exit();
  });
  }
});
