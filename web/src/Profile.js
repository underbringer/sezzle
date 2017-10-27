import React, { Component } from 'react';

class Profile extends Component {

  componentWillMount() {
    this.setState({
      profile: {}
    });

    console.log('AUTH', this.props.auth);

    const { userProfile, getProfile } = this.props.auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="profile-page">
        <h2>{profile.name}</h2>
        <img src={profile.picture} alt="profile" />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}

export default Profile;
