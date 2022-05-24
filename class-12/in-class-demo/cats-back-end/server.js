'use strict'

// requirements for server
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// bring in a schema if we want to interact with that model.
const Cat = require('./models/cat.js');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});




// implement express
const app = express();

// middleware
app.use(cors());
// must have this to recieve JSON from a request
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;



// routes
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
})

app.get('/cats', getCats);
app.post('/cats', postCats);
// We must have a path parameter. It will be the (unknown) id
// we will use a variable to capture the id
// to create a varialbe in a path we use ":<variable-name" in the place of the path parameter. (it's like saying `let pathParam`)
app.delete('/cats/:id', deleteCats);

async function getCats(req, res, next) {
  let queryObject = {};
  if (req.query.location) {
    queryObject = {
      location: req.query.location
    }
  }
  try {
    let results = await Cat.find(queryObject);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postCats(req, res, next) {
  // console.log(req.body);
  try {
    let createdCat = await Cat.create(req.body);
    // console.log(createdCat)
    res.status(200).send(createdCat);
  } catch(error) {
    next(error);
  }
}

async function deleteCats(req, res, next) {
  // console.log(req.params.id);
  try {
    await Cat.findByIdAndDelete(req.params.id);
    res.status(200).send('cat deleted');
  } catch (error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
})

// error
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
