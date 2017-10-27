import axios from 'axios';
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

import './App.css';
import Db from './Db';
import Frontpage from './Frontpage';
import Secondpage from './Secondpage';

class App extends Component {

  componentDidMount() {
    axios.get('/api/foo')
      .then(function (response) {
        console.log(response);
        // self.setState({message: response.data.message});  /*this will cause an invoke of the render() function again */
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar is-light">
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item title" href="/">5117 Express Project Template</a>
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
            <div>
              <Route path="/foo" component={Secondpage}/>
            </div>

          </div>
        </section>

        <section className="section">
          <footer>
            <div className="content">
              <h1>pages:</h1>
              <ul>
                <li><Link to="/">home page</Link></li>
                <li><Link to="/foo">second page</Link></li>
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
