import auth0 from 'auth0-js';

console.log('process.env', process.env);

const auth0config = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,

  // must match with API identifier in auth0
  audience: process.env.REACT_APP_AUTH0_API_ID,
  responseType: 'token id_token',

  // scope matches with auth0 scopes
  scope: 'openid profile read:messages'
});

export default auth0config;
