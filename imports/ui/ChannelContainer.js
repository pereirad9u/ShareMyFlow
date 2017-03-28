import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '../api/channels/channels.js';
import { ChannelSongs } from '../api/channelSongs/channelSongs.js';
import { Songs } from '../api/Songs/methods.js';
import { ChannelChats } from '../api/channelChat/channelChats.js';


import Channel from './Channel.jsx';


export default ChannelContainer = createContainer(({_id}) => {
  Meteor.subscribe('channels');

  const channelSongHandle = Meteor.subscribe('channelSongs');
  const loading = !channelSongHandle.ready();

  let searchValue = Session.get('searchVal');
// console.log('containerID', _id);
  Meteor.subscribe('songs', searchValue);

  Meteor.subscribe('channelChats');

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
    // artist filter: {artistName: searchVal}
  return {
    searchResults: searchResults,
    channelSong: relevantChannelSongs,
    channelChat : relevantChannelChats,
    channels: singleChannel,
    loading,
    countOfChannelSongs: countOfChannelSongs,
    currentUser: Meteor.user(),
  };
}, Channel);
