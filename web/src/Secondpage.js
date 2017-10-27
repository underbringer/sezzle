import React, { Component } from 'react';

class Secondpage extends Component {

  componentDidMount() {
    console.log('FOO')
  }

  render() {
    return (
      <div className="Secondpage">
        <p>
          You are now on a second page!
        </p>
      </div>
    );
  }
}

export default Secondpage;
