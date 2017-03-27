import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Channel component - represents a single Channel item
export default class ChannelItem extends Component {
  // toggleChecked() {
  //   // Set the checked property to the opposite of its current value
  //   Meteor.call('channels.setChecked', this.props.channel._id, !this.props.channel.checked);
  // }

  deleteThisChannel() {
    Meteor.call('channels.remove', this.props.channel._id);
  }

  // togglePrivate() {
  //   Meteor.call('channels.setPrivate', this.props.channel._id, ! this.props.channel.private);
  // }

  render() {
    // Give channels a different className when they are checked off,
    // so that we can style them nicely in CSS
    const channelClassName = classnames({
      checked: this.props.channel.checked,
      private: this.props.channel.private,
    });

    return (
      <li className={channelClassName}>
        <button className="delete" onClick={this.deleteThisChannel.bind(this)}>
          &times;
        </button>

        <a href={FlowHelpers.pathFor( 'channel', {_id: this.props.channel._id} )} className="text">
          <strong>{this.props.channel.username}</strong>: {this.props.channel.text}
        </a>
      </li>
    );
  }
}

ChannelItem.propTypes = {
  // This component gets the channel to display through a React prop.
  // We can use propTypes to indicate it is required
  channel: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
