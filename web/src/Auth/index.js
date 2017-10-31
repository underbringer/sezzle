import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import auth0 from 'auth0-js';

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

// docs: https://reactjs.org/docs/higher-order-components.html
function withAuth(WrappedComponent) {

  class ComponentWithAuth extends Component {

    constructor(props) {
      super(props);
      this.auth0 = auth0config;

      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.getProfile = this.getProfile.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
    }

    login() {
      this.auth0.authorize();
    }

    handleAuthentication() {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.props.history.replace('/');
        } else if (err) {
          this.props.history.replace('/');
          console.log(err);
        }
      });
    }

    setSession(authResult) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      this.props.history.replace('/');
    }

    logout() {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // navigate to the home route
      this.props.history.replace('/');
    }

    isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    getAccessToken() {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
      return accessToken;
    }

    getProfile(cb) {
      let accessToken = this.getAccessToken();
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          this.userProfile = profile;
        }
        cb(err, profile);
      });
    }

    render() {
      return (
        <div>

          <WrappedComponent
            isAuthenticated={this.isAuthenticated}
            login={this.login}
            logout={this.logout}
            getProfile={this.getProfile}
            getAccessToken={this.getAccessToken}
            />

          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props)
            return <div>loading...</div>
          }}/>
        </div>
      );
    }
  };

  return withRouter(ComponentWithAuth);
}

export { withAuth };
