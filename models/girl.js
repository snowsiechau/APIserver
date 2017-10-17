//TODO
// 1. import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 2. create schema
var girlSchema = new Schema({
  name: String,
  image: String,
  yob: Number,
});

// 3. create model
var GirlModel = mongoose.model('girl', girlSchema);

// 4. export
module.exports = GirlModel;
