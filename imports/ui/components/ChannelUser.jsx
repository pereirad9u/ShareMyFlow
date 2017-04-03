import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ChannelUser extends Component {

  render(){
      let username = this.props.channelUser.profile.display_name !== null ? this.props.channelUser.profile.display_name:this.props.channelUser.profile.id;

      return (
      <li className="list-group-item">
        <span className="text">
          <strong><a href={'/profile/'+this.props.channelUser._id}>{username}</a></strong>
        </span>
      </li>
    );
  }
}

ChannelUser.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    channelUser: PropTypes.object.isRequired
};
