import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Home from './../components/Home.jsx';
import { Channels } from '../../api/channels/channels.js';

export default HomeContainer = createContainer(() => {

  const channelHandle = Meteor.subscribe('channels');
  const loading = !channelHandle.ready();

  return {
    currentUser: Meteor.user(),
    loading,
  };
}, Home);
