import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'

import ExampleQueryPage from './ExampleQueryPage';
import Footer from './Footer';
import FrontPage from './FrontPage';
import Header from './Header';
import ProfilePage from './ProfilePage';

import auth0 from 'auth0-js';

class App extends Component {

  auth0 = new auth0.WebAuth({
    domain: 'maxharp3r.auth0.com',
    clientID: 'ib-OlMoJ1_C5oyTsOUgOX_6ImltKk8lW',
    redirectUri: 'http://localhost:3000/callback',

    // must match with API identifier in auth0
    // audience: 'https://react-project-template-5117.herokuapp.com/api/',
    audience: 'https://maxharp3r.auth0.com/api/v2/',
    responseType: 'token id_token',

    // scope matches with auth0 scopes
    scope: 'openid profile read:messages'
  });

  constructor(props) {
    super(props);
    this.isAuthenticated = this.isAuthenticated.bind(this);
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
      <div className="App">
        <Header isAuthenticated={this.isAuthenticated} login={this.login} logout={this.logout} />

        <section className="section">
          <div className="content">

            <div>
              <Route exact path="/" component={FrontPage}/>
            </div>
            <div>
              <Route path="/example-query" render={(props) => <ExampleQueryPage getAccessToken={this.getAccessToken} {...props} />} />
            </div>
            <div>
              <Route path="/callback" render={(props) => {
                this.handleAuthentication(props);
                return <div>loading...</div>
              }}/>
            </div>
            <div>
              <Route path="/profile" render={
                (props) => <ProfilePage userProfile={this.userProfile} getProfile={this.getProfile} {...props} />
              } />
            </div>

          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
