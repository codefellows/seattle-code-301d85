'use strict';
/// dotenv
// mongoose
// Database connection

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat.js');

async function seed() {
  // structure is the same as our Cat Schema

  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}
  await Cat.create({
    name: 'Axel',
    color: 'yellow',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Axel was added to the database');

  await Cat.create({
    name: 'Chickpea',
    color: 'black',
    spayNeuter: true,
    location: 'Renton'
  });
  console.log('Chickpea was added');

  mongoose.disconnect();
}

seed();
