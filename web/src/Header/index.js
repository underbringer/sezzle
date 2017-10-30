import React, { Component } from 'react';

class Header extends Component {

  constructor(props) {
    super(props);

    this.isAuthenticated = this.props.isAuthenticated.bind(this);
    this.login = this.props.login.bind(this);
    this.logout = this.props.logout.bind(this);
  }

  render() {
    return (
      <nav className="navbar is-light">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item title" href="/">5117 React Project Template</a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">

              {
                !this.isAuthenticated() && (
                  <button className="button" onClick={this.login}>
                    Log In
                  </button>
                )
              }

              {
                this.isAuthenticated() && (
                  <button className="button" onClick={this.logout}>
                    Log Out
                  </button>
                )
              }

            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
