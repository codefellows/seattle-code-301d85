'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extract the schema property from the mongoose object
const { Schema } = mongoose;

// create a cat schema, define how our object will be structure/
// what methods and properties should it have?
const catSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location: {type: String, required: true}
});

// define our model
// it gives mongoose functionality andd a predefined schema to shape our data. 
// arguments: a string and a schema object:
const CatModel = mongoose.model('Cat', catSchema);

module.exports = CatModel;
