import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';


//probably not needed
// import { channelSongs } from '../api/channelSongs/channelSongs.js';
import ChannelSong            from './components/ChannelSong.jsx';
import SongSearchResultsItem  from './components/SongSearchResultsItem.jsx';
import SearchSong             from './components/SearchSong.jsx';


// Channels component - represents the rendering of channels
export default class Channel extends Component {

    renderChannelSongs() {
// console.log('loadingFlag',this.props.loading);

        if (!this.props.loading) {
            return channelSongList = this.channelSongList(this);
        }


    }

    channelSongList(context) {
        let filteredChannelSongs = context.props.channelSong;

        let currentChannel = context.props.channels[0];
// console.log('searchresultsplaylist', currentChannel, "filteredSongs", filteredSongs);

        return filteredChannelSongs.map((channelSong) => {
            //--------------this should be passed to the component as well for "who added this" validation
            const currentUserId = context.props.currentUser && context.props.currentUser._id;
// console.log('iteratingSong', song);
            return (
                <ChannelSong
                    key={channelSong._id}
                    channel={currentChannel}
                    channelSong={channelSong}
                />
            );
        });
    }

    renderSearchResults() {
        let filteredSongs = this.props.searchResults;

        let currentChannel = this.props.channels[0];

// console.log('countOfChannelSongs',this.props.countOfChannelSongs);

        return filteredSongs.map((song) => {
//--------------this should be passed to the component as well for "who added this" validation
// const currentUserId = this.props.currentUser && this.props.currentUser._id;
// console.log('iteratingSong', song);

            // Get the count of songs in list and add one for input
            song.order = this.props.countOfChannelSongs + 1;
            return (
                <SongSearchResultsItem
                    key={song._id}
                    channel={currentChannel}
                    song={song}
                />
            );
        });
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        this.over = e.target;
    }
     renderChannelName(){
         let currentChannel = this.props.channels[0];
         const name = currentChannel.text;
         const user = currentChannel.username;

         return(
             <h3 className="title-channel">Channel {name}, by {user} :</h3>
         )
     }

    render() {
        return (
            <div className="componentWrapper">
                {this.renderChannelName()}
                <div className="col-md-4">
                    <ul
                        className="event-list"
                        onDragOver={this.dragOver}
                    >
                        {this.renderChannelSongs()}
                    </ul>

                    <SearchSong />

                    <div className="list-group">
                        {this.renderSearchResults()}
                    </div>
                </div>
            </div>

        );
    }

};

Channel.propTypes = {
    loading: PropTypes.bool,
    channels: PropTypes.array.isRequired,
    channelSong: PropTypes.array.isRequired,
    searchResults: PropTypes.array.isRequired,
    countOfChannelSongs: PropTypes.number,
    currentUser: PropTypes.object,
};
