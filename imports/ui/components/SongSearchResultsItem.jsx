import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

// Channel component - represents a single Channel item
export default class SongSearchResultsItem extends Component {
    // toggleChecked() {
    //   // Set the checked property to the opposite of its current value
    //   Meteor.call('channels.setChecked', this.props.channel._id, !this.props.channel.checked);
    // }

    addToChannelSong() {
        let channelId = this.props.channel._id, song = this.props.song;
        let channelPort = this.props.channel.portServ;

        // ----------------------need error handling to see if song has been added to list already---------

        Meteor.call('channelSongs.insert', channelId, song, channelPort);
    }

    render() {
        let song = this.props.song;

        return (
            <a href="#" className="list-group-item list-group-item-action" onClick={this.addToChannelSong.bind(this)}>
                {song.trackName} by {song.artistName}
            </a>
        );
    }
}

SongSearchResultsItem.propTypes = {
    // This component gets the channel to display through a React prop.
    // We can use propTypes to indicate it is required
    song: PropTypes.object.isRequired,
    channel: PropTypes.object.isRequired,
};
