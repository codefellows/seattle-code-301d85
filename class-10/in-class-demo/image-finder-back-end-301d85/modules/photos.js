'use strict';

const axios = require('axios');

let cache = {};

async function getPhotos(req, res, next) {
  // find out what the front is requesting
  try {
    let search = req.query.searchQuery;


    // create a key to place or find the data in the cache

    let key = search + 'Data';

    let timeOkToCache = 1000 * 60 * 60 * 24 * 30;
    // let timeOkToCacheForTest = 1000 * 20;
    if (cache[key] && (Date.now() - cache[key].timestamp < timeOkToCache)) {
      // send it to the front end
      console.log('you already made this request');
      res.status(200).send(cache[key].data);
    } else {
      console.log('new search request');
      // make request to the Unsplash API
      let params = {
        client_id: process.env.UNSPLASH_API_KEY,
        query: search
      }
      let baseURL = 'https://api.unsplash.com/search/photos/';

      let results = await axios.get(baseURL, { params });

      // Groom the data we get back from Unplash
      let groomedPhotos = results.data.results.map(pic => new Photo(pic));

      cache[key] = {
        data: groomedPhotos,
        timestamp: Date.now()
      }
      // send it to the front end
      res.status(200).send(groomedPhotos);
    }
    
  } catch (error) {
    next(error);
  }

}

// let photoResults = await axios.get(baseURL, { params });
// let groomedPhotos = photoResults.data.results.map(pic => new Photo(pic));
// res.status(200).send(groomedPhotos);



// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

module.exports = getPhotos;



// async function getPhotos(req, res, next) {
//   console.log('I fired');
//   try {
//     // find out what the front is requesting
//     let search = req.query.searchQuery;
//     // make request to the Unsplash API
//     let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${search}`;

//     let results = await axios.get(url);

//     // Groom the data we get back from Unplash
//     let groomedPhotos = results.data.results.map(pic => new Photo(pic));

//     // send it to the front end
//     res.send(groomedPhotos);
//   } catch (error) {
//     next(error);
//   }
// }


// async function getPhotos(req, res, next) {
//   console.log('I fired');
//   try {
//     // find out what the front is requesting
//     let search = req.query.searchQuery;
//     // make request to the Unsplash API
//     let params = {
//       client_id: process.env.UNSPLASH_API_KEY,
//       query: search
//     }
//     let baseURL = 'https://api.unsplash.com/search/photos/';

//     let results = await axios.get(baseURL, { params });

//     // Groom the data we get back from Unplash
//     let groomedPhotos = results.data.results.map(pic => new Photo(pic));

//     // send it to the front end
//     res.send(groomedPhotos);
//   } catch (error) {
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     }).catch(next);
//   }
// }
