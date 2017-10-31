import React, { Component } from 'react';

class ProfilePage extends Component {

  render() {
    let profileInfo = <div>not logged in</div>;
    if (this.props.profile) {
      profileInfo = (
        <div>
          <h2>{this.props.profile.name}</h2>
          <img src={this.props.profile.picture} alt="profile" />
          <pre>{JSON.stringify(this.props.profile, null, 2)}</pre>
        </div>
      );
    }

    return (
      <div className="profile-page">
        {profileInfo}
      </div>
    );
  }
}

export default ProfilePage;
