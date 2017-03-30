import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// import { createContainer } from 'meteor/react-meteor-data';


//probably not needed
// import { channelSongs } from '../api/channelSongs/channelSongs.js';
import ChannelSong            from './components/ChannelSong.jsx';
import ChannelChat            from './components/ChannelChat.jsx';
import ChannelUser            from './components/ChannelUser.jsx';
import SongSearchResultsItem  from './components/SongSearchResultsItem.jsx';
import SearchSong             from './components/SearchSong.jsx';


// Channels component - represents the rendering of channels
export default class Channel extends Component {

    renderChat(context) {
        let filteredTasks = context.props.channelChat;
        let currentChannel = context.props.channels[0];
        return filteredTasks.map((channelChat) => {
            const currentUserId = context.props.currentUser && context.props.currentUser._id;
            const showPrivateButton = channelChat.owner === currentUserId;

            return (
                <ChannelChat
                    key={channelChat._id}
                    channel={currentChannel}
                    channelChat={channelChat}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }



    handleSubmit(event) {
        event.preventDefault();
        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        let channelId = this.props.channels[0]._id;

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        try {
            Meteor.call('channelChats.insert', channelId, text);

        } catch (e) {
            console.log('lol');
        }
    }

    renderUsers() {

        let users = this.props.channelUsers;
        console.log('log', users);
        return users.map((user) => {
            return (
                <ChannelUser
                    key={user._id}
                    channelUser={user}
                />
            );

        });
    }

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

    renderChannelName(context) {
        if (!this.props.loading) {
            let currentChannel = context.props.channels[0];
            const name = currentChannel.text;
            const user = currentChannel.username;

            return (
                <h3 className="title-channel">Channel {name},<br/> by {user} :</h3>
            )

        }

    }

    renderAudio(context) {
        if (!this.props.loading) {
            return(
                <audio src={"http://89.80.51.248:800" + this.props.channels[0].portServ} autoPlay="autoPlay"
                       controls="controls" preload="none"></audio>
            )
        }
    }

    render() {
        return (
            <div className="componentWrapper">
                {this.renderChannelName(this)}
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Music waiting list
                                </h3>
                            </div>
                            <div className="panel-body">
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
                    </div>
                    <div className="col-md-5">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Chat !!</h3>
                            </div>
                            <div className="panel-body panel-chat">
                                <ul className="list-group">
                                    {this.renderChat(this)}
                                    { this.props.currentUser ?
                                        <li className="list-group-item">
                                            <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
                                                <div className="input-group">
                                                    <span className="input-group-addon">New message</span>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        ref="textInput"
                                                        placeholder="Entrer un message"
                                                    />
                                                </div>
                                            </form>
                                        </li> : ''
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">User list !!</h3>
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {this.renderUsers()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.renderAudio(this)}
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
    channelChat: PropTypes.array.isRequired,
    channelUsers: PropTypes.array,
};
