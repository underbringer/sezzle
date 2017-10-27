import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

import './App.css';
import Db from './Db';
import Frontpage from './Frontpage';
import Profile from './Profile';

import Auth from './Auth.js';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <nav className="navbar is-light">
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item title" href="/">5117 React Project Template</a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">

                {
                  !isAuthenticated() && (
                    <button className="button" onClick={this.login.bind(this)}>
                      Log In
                    </button>
                  )
                }

                {
                  isAuthenticated() && (
                    <button className="button" onClick={this.logout.bind(this)}>
                      Log Out
                    </button>
                  )
                }

              </div>
            </div>
          </div>
        </nav>

        <section className="section">
          <div className="content">

            <div>
              <Route exact path="/" component={Frontpage}/>
            </div>
            <div>
              <Route path="/db" component={Db}/>
            </div>
            <div>
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <div>loading...</div>
              }}/>
            </div>
            <div>
              <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
            </div>

          </div>
        </section>

        <section className="section">
          <footer>
            <div className="content">
              <h1>pages:</h1>
              <ul>
                <li><Link to="/">home page</Link></li>
                <li><Link to="/profile">profile page</Link></li>
                <li><Link to="/db">db</Link></li>
                <li><a href="/upload">file upload (TODO)</a></li>
                <li><a href="/protected">protected page (TODO)</a></li>
              </ul>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default App;
