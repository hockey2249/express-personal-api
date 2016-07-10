// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var shop_list = [
  {
    name: "The Giving Tree of Denver",
    address: "2707 W 38th Ave, Denver, CO 80211",
    website: "tgtree.com",
    phone: 3034778888,
  },
   {
    name: "Urban Dispensary",
    address: "2675 W 38th Ave, Denver, CO 80211",
    website: "urbandispensary.com",
    phone: 7203899179,
  },
  {
    name: "The Giving Tree of Denver",
    address: "2707 W 38th Ave, Denver, CO 80211",
    website: "tgtree.com",
    phone: 3034778888,
  },
   {
    name: "Urban Dispensary",
    address: "2675 W 38th Ave, Denver, CO 80211",
    website: "urbandispensary.com",
    phone: 7203899179,
  },
    {
    name: "The Giving Tree of Denver",
    address: "2707 W 38th Ave, Denver, CO 80211",
    website: "tgtree.com",
    phone: 3034778888,
  },
   {
    name: "Urban Dispensary",
    address: "2675 W 38th Ave, Denver, CO 80211",
    website: "urbandispensary.com",
    phone: 7203899179,
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