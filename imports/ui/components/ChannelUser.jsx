import React, { Component, PropTypes } from 'react';
import { ChannelUsers } from '../../api/channelUser/channelUsers.js';
import { Meteor } from 'meteor/meteor';

export default class ChannelUser extends Component {

  render(){
      let username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name:Meteor.user().profile.id;
      return (
      <li className="list-group-item">
        <span className="text">
          <strong>{username}</strong>
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
