import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {createContainer} from 'meteor/react-meteor-data';

import Channel from "./Channel";

import {Channels} from '../api/channels/channels.js';
import {getPlaylist} from '../api/getPlaylist/methods.js';

import {ChannelSongs} from '../api/channelSongs/channelSongs.js';
import {Songs} from '../api/Songs/methods.js';
import {ChannelChats} from '../api/channelChat/channelChats.js';
import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api'


export default ChannelContainer = createContainer(({_id}) => {
    Meteor.subscribe('channels');

    const channelSongHandle = Meteor.subscribe('channelSongs');
    const loading = !channelSongHandle.ready();

    let searchValue = Session.get('searchVal');
    Meteor.subscribe('songs', searchValue);

    Meteor.subscribe('channelChats');

    Meteor.subscribe('users');


    //Get the channel information for the channel matching the id in the url
    const singleChannel = Channels.find({_id: _id}).fetch();


    //Get an array of songs matching the current channel
    const relevantChannelSongs = ChannelSongs.find({channelId: _id}).fetch();

    //Get an array of search results based on search value
    const searchResults = Songs.find().fetch();

    //Get a count of channel songs for order incrementing
    const countOfChannelSongs = ChannelSongs.find({channelId: _id}).count();

    //Get messages from the chat
    const relevantChannelChats = ChannelChats.find({channelId: _id}).fetch();

    const relevantChannelUsers = Meteor.users.find({'profile.current_channel' : _id}).fetch();

    return {
        searchResults: searchResults,
        channelSong: relevantChannelSongs,
        channelChat: relevantChannelChats,
        channelUsers: relevantChannelUsers,
        channels: singleChannel,
        loading,
        countOfChannelSongs: countOfChannelSongs,
        currentUser: Meteor.user(),
    };
}, Channel);
