import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import { ChannelSongs } from '../api/channelSongs/channelSongs.js';

import {Playlist} from '../api/Playlist/methods.js';
import NewChannel from "./NewChannel";

export default NewChannelContainer = createContainer(({_id}) => {

    Meteor.subscribe('playlist');
    const channelSongHandle = Meteor.subscribe('channelSongs');
    const loading = !channelSongHandle.ready();
    const playlist =  Session.get("currentPlaylists");
    return {
        playlist : playlist,
        loading
    }
},NewChannel);

