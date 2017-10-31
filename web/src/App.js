import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import { withAuth } from './Auth';
import ExampleQueryPage from './ExampleQueryPage';
import Footer from './Footer';
import FrontPage from './FrontPage';
import Header from './Header';
import ProfilePage from './ProfilePage';

class App extends Component {

  render() {

    // console.log('is authenticated?', this.props.isAuthenticated());
    // console.log('profile', this.props.profile);

    return (
      <div className="App">
        <Header {...this.props} />

        <section className="section">
          <div className="content">

            <Route exact path="/" component={FrontPage}/>

            <Route path="/example-query" render={props => <ExampleQueryPage {...this.props} />} />

            <Route path="/profile" render={props => <ProfilePage {...this.props} />} />

          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default withAuth(App);
