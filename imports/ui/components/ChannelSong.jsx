import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

// ChannelSong component - represents a single channelSong item
export default class ChannelSong extends Component {

    // let placeholder = document.createElement("li");
    // placeholder.className = "placeholder";
    removeThisSongFromChannel() {
        Meteor.call('channelSongs.remove', this.props.channelSong._id);
    }//,
    //
    // togglePrivate() {
    //   Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    // }


    render() {

        let channelSong = this.props.channelSong
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const channelSongClassName = classnames({
            checked: false,//this.props.task.checked,
            private: false,//this.props.task.private,
            "list-group-item": true,
            "list-group-item-action": true,
        });

        const channelSongAnchorClasses = classnames({
            "list-group-item": true,
            "list-group-item-action": true,
        });
// console.log('channelSongDetails', this.props.channelSong);
        return (
            <li
                key={channelSong._id}
                data-id={channelSong._id}
                className={channelSongClassName}
            >
                { Meteor.userId() === channelSong.owner ?
                    <span className="pull-right delete_song">
          <button className="btn btn-xs btn-danger" onClick={this.removeThisSongFromChannel.bind(this)}>
            &times;
          </button>
        </span> : ""
                }
                <div className="info">
                    <h2 className="title">{channelSong.trackName} by {channelSong.artistName}</h2>
                    <p className="desc">Added by {channelSong.username}</p>
                </div>
            </li>
        );
    }
}

ChannelSong.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    channel: PropTypes.object.isRequired,
    channelSong: PropTypes.object.isRequired,
};
