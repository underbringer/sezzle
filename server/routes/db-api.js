var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

// checkJwt middleware will enforce valid authorization token
router.get('/', checkJwt, function(req, res, next) {

  // the auth0 user identifier
  console.log('auth0 user id:', req.user.sub);

  // fetch info about the user
  const userInfoUrl = req.user.aud[1];
  const bearer = req.headers.authorization;
  fetch(userInfoUrl, {
  	headers: { 'authorization': bearer },
  })
    .then(res => res.json())
    .then(userInfoRes => console.log('user info res', userInfoRes))
    .catch(e => console.error('error fetching userinfo from auth0'));

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

});

module.exports = router;
