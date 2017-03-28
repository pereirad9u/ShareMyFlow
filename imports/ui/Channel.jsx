import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';


//probably not needed
// import { channelSongs } from '../api/channelSongs/channelSongs.js';
import ChannelSong            from './components/ChannelSong.jsx';
import ChannelChat            from './components/ChannelChat.jsx';
import {ChannelChats}           from '../api/channelChat/channelChats.js';
import SongSearchResultsItem  from './components/SongSearchResultsItem.jsx';
import SearchSong             from './components/SearchSong.jsx';


// Channels component - represents the rendering of channels
export default class Channel extends Component {

  renderChat(context) {
      let filteredTasks = context.props.channelChat;
      console.log(filteredTasks);
      let currentChannel = context.props.channels[0];
      console.log(currentChannel);
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
        console.log(channelId);
        /*
        ChannelChats.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });*/
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        try {
          Meteor.call('channelChats.insert', channelId, text);

        }catch(e){
          console.log('lol');
        }
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
     renderChannelName(context){
         let currentChannel = context.props.channels[0];
         const name = currentChannel.text;
         const user = currentChannel.username;

         return(
             <h3 className="title-channel">Channel {name}, by {user} :</h3>
         )
     }

    render() {
        return (
            <div className="componentWrapper">
                {this.renderChannelName(this)}
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
                    <div className="list-group">
                        <audio src={"http://89.80.51.248:800"+this.props.channels[0].portServ} autoPlay="autoPlay" controls="controls" preload="none"></audio>
                    </div>
                </div>
                <div className="col-md-4">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Chat !!</h3>
                    </div>
                    <div className="panel-body panel-chat">
                      <ul className="list-group">
                      {this.renderChat(this)}
                      { this.props.currentUser ?
                          <li className="list-group-item">
                          <form className="form-group" onSubmit={this.handleSubmit.bind(this)} >
                          <div className="input-group">
                          <span className="input-group-addon">New message</span>
                          <input
                          className="form-control"
                          type="text"
                          ref="textInput"
                          placeholder="Entrer un message"
                          />
                          </div>
                          </form></li> :''
                        }
                      </ul>
                    </div>
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
    channelChat : PropTypes.array.isRequired,
};
