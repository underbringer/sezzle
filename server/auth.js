const debug = require('debug')('app:auth');

const express = require('express');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

debug(`auth0: domain=${process.env.REACT_APP_AUTH0_DOMAIN}`)

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 60,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

module.exports.checkJwt = checkJwt;


passport.use(new Auth0Strategy(
  {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.REACT_APP_AUTH0_CALLBACK_URL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // debug("auth0 strategy callback; profile: " + JSON.stringify(profile, null, 4));
    return done(null, profile);
  }
));

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  // debug("auth0 serialize user: " + JSON.stringify(user, null, 4));
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // debug("auth0 deserialize user: " + JSON.stringify(user, null, 4));
  done(null, user);
});

// login/logout routes

var router = express.Router();

// session login and redirect to homepage
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    audience: 'https://' + process.env.REACT_APP_AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  }
);

module.exports.router = router;
