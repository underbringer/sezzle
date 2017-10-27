import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './App.css';

class Db extends Component {

  render() {
    return (
      <div className="Db">

        <h1>todos from a db call</h1>
        <ul>
          <li>(todo task)</li>
        </ul>

        <h1>Demos:</h1>
        <ul>
          <li><Link to="/foo">go to second page</Link></li>
          <li><a href="/db">db (TODO)</a></li>
          <li><a href="/upload">file upload (TODO)</a></li>
          <li><a href="/protected">protected page (TODO)</a></li>
        </ul>

      </div>
    );
  }
}

export default Db;
