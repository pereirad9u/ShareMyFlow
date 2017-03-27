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

    const owner = this.props.showPrivateButton;
    const dateFormat = require('dateformat');

    let day = this.props.channel.createdAt;
    day = dateFormat(day, 'dd/mm/yy HH:MM');

    return (
      // <li className={channelClassName}>
      //     { owner ? <button className='delete' onClick={this.deleteThisChannel.bind(this)}> &times; </button>:''}
      //
      //   <a href={FlowHelpers.pathFor( 'channel', {_id: this.props.channel._id} )} className="text">
      //     <strong>{this.props.channel.username}</strong>: {this.props.channel.text}
      //   </a>
      // </li>
      <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="thumbnail">
          <div className="caption">
          <div className='col-lg-12 well well-add-card'>
          <h4>{this.props.channel.text}</h4>
      </div>
      <div className='col-lg-12'>
          <p>Create by {this.props.channel.username}, {day}</p>

      </div>
      <a href={FlowHelpers.pathFor( 'channel', {_id: this.props.channel._id} )} className="btn btn-primary btn-join">Join</a>
              { owner ? <a onClick={this.deleteThisChannel.bind(this)} className="btn btn-danger">Delete</a>:''}

          </div>
          </div>
          </div>

  );
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
