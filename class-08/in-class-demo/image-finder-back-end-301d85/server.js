'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// USE
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;


// ROUTES
app.get('/', (req, res) => {
  res.send('all systems go');
});

app.get('/photos', async (req, res, next) => {
  try {
  // find out what the front is requesting
  let search = req.query.searchQuery;
  // make request to the Unsplash API
  let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${search}`;
  
  let results = await axios.get(url);
  
  // Groom the data we get back from Unplash
  let groomedPhotos = results.data.results.map(pic => new Photo(pic));

  // send it to the front end
  res.send(groomedPhotos);
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Not found')
})


// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}


// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message)
  response.status(500).send(error.message)
});


// LISTEN
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
