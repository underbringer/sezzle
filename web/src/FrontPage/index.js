import React, { Component } from 'react';

import logo from './logo.svg';
import './frontpage.css';

const countStyle = {
  color: 'brown',
};

class Frontpage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0
    }
    this.foo = this.foo.bind(this);
  }

  foo() {
    this.setState(prevState => {
      return {clickCount: prevState.clickCount + 1}
    })
  }

  render() {
    return (
      <div className="FrontPage">
        <h1>
          <span className="icon"><i className="fa fa-home"></i></span>
          &nbsp;
          the front page!
        </h1>

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <button className="button" onClick={this.foo}>example button</button>
            </div>
            <div className="level-item" style={countStyle}>
              click count: {this.state.clickCount}
            </div>
          </div>
        </div>

        <div>
          <img src={logo} className="the-logo" alt="logo" />
        </div>

      </div>
    );
  }
}

export default Frontpage;
