import axios from 'axios';
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <nav>
          <Link to="/foo">go to second page</Link>
        </nav>

        <div>
          <Route exact path="/" component={Frontpage}/>
        </div>
        <div>
          <Route path="/foo" component={Secondpage}/>
        </div>
      </div>
    );
  }
}

export default App;
