var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShopSchema = new Schema({
  name: String,
  address: String,
  website: String,
  phone: Number
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;