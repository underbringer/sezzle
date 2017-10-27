import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Secondpage extends Component {

  componentDidMount() {
    console.log('FOO')
  }

  render() {
    return (
      <div className="Secondpage">
        <p>
          You are now on a second page! <Link to={`/`}>back to home</Link>
        </p>
      </div>
    );
  }
}

export default Secondpage;
