import React, { Component } from 'react';

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'maxharp3r.auth0.com',
    clientID: 'ib-OlMoJ1_C5oyTsOUgOX_6ImltKk8lW',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://maxharp3r.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
