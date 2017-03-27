import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Channels } from '../../api/channels/channels.js';
// import Task from '../Task.jsx';
import ChannelList from './../pages/ChannelList.jsx';

export default ChannelListContainer = createContainer(() => {
  Meteor.subscribe('channels');

  return {
    channels: Channels.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, ChannelList);
