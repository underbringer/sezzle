import React, { Component } from 'react';

class ProfilePage extends Component {

  componentWillMount() {
    this.setState({
      profile: {}
    });

    if (!this.props.userProfile) {
      this.props.getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: this.props.userProfile });
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

export default ProfilePage;
