import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Nav from './../components/nav.jsx';
import {ChannelChats} from '../../api/channelChat/channelChats.js';

export default NavContainer = createContainer(() => {

  const userHandle = Meteor.subscribe('users');
  const loading = !userHandle.ready();

  return {
    currentUser: Meteor.user(),
    loading,
  };
}, Nav);
