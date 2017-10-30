import React, { Component } from 'react';

import logo from './logo.svg';
import './frontpage.css';

class Frontpage extends Component {

  constructor(props) {
    super(props);
    this.foo = this.foo.bind(this);
  }

  foo() {
    this.props.history.replace('/db')
  }

  render() {
    return (
      <div className="Frontpage">
        <h1>
          <span className="icon"><i className="fa fa-home"></i></span>
          &nbsp;
          the front page!
        </h1>
        <div>
          <button className="button" onClick={this.foo}>example button</button>
        </div>
        <div>
          <img src={logo} className="the-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Frontpage;
