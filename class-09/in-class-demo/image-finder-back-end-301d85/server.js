'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getPhotos = require('./modules/photos');

// USE
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;


// ROUTES
app.get('/', (req, res) => {
  res.send('all systems go');
});

app.get('/photos', getPhotos);

app.get('*', (req, res) => {
  res.status(404).send('Not found')
})


// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});


// LISTEN
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
