import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

// ChannelSong component - represents a single channelSong item
export default class ChannelSong extends Component {

    removeThisSongFromChannel() {
        Meteor.call('channelSongs.remove', this.props.channelSong._id);
    }//,
    //
    // togglePrivate() {
    //   Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    // }
    ratePlus() {
        Meteor.call('channelSongs.ratePlus', this.props.channelSong._id)

    }

    rateMoins() {
        Meteor.call('channelSongs.rateMoins', this.props.channelSong._id)
    }

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

        return (
            <li
                key={channelSong._id}
                className={channelSongClassName}

            >
                { Meteor.userId() === channelSong.owner && channelSong.order != 1 ?
                    <span className="pull-right delete_song">
          <button className="btn btn-xs btn-danger" onClick={this.removeThisSongFromChannel.bind(this)}>
            &times;
          </button>
        </span> : ""
                }
                <div className="info">
                    { channelSong.order != 1 ?
                    <div className="col-md-2">
                        <i className="fa fa-sort-asc" aria-hidden="true" onClick={this.ratePlus.bind(this)}></i>
                        <p>{channelSong.rate}</p>
                        <i className="fa fa-sort-down" aria-hidden="true" onClick={this.rateMoins.bind(this)}></i>
                    </div>: ""}
                    <h2 className="title">{channelSong.trackName} by {channelSong.artistName}</h2>
                    <p className="desc">Added by <a href={'/profile/'+channelSong.owner}>{channelSong.username}</a></p>
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
