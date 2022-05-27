'use strict';

// JSON Web token — JWT (pronounced JOT)
const jwt = require('jsonwebtoken');
// jwks — JSON web key set (pronounced ja-wicks)
const jwksClient = require('jwks-rsa');

// the jwks uri come Auth0 account page -> advanced settings -> Endpoints -> 0auth -> JSON Web Key Set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// I need a getKey function from jsonwebtoken to make things work,
// this can be found at the jsonwebtoken docs - search for getKey and/or "auth0"
// from: https://www.npmjs.com/package/jsonwebtoken

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// this function will verify who the user on our route is (are the valid?)
// this is just how do it
function verifyUser (req, errorFirstOrUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction);
  } catch (error) {
    errorFirstOrUserCallbackFunction('Not authorized');
  }
}

module.exports = verifyUser
