import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

import './App.css';
import Db from './Db';
import Frontpage from './Frontpage';

import Auth from './Auth.js';

// const auth = new Auth();
// auth.login();

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className="navbar is-light">
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item title" href="/">5117 React Project Template</a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">TODO</div>
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

          </div>
        </section>

        <section className="section">
          <footer>
            <div className="content">
              <h1>pages:</h1>
              <ul>
                <li><Link to="/">home page</Link></li>
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
