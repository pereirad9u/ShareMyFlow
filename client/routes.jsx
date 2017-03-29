import React from 'react';
import {mount} from 'react-mounter';
import { Meteor } from 'meteor/meteor';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../imports/ui/layouts/App.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.js';
import {Meteor} from 'meteor/meteor'

import NewChannel from '../imports/ui/NewChannel.jsx';
import ChannelContainer from '../imports/ui/ChannelContainer.js';
import NewChannelContainer from '../imports/ui/NewChannelContainer.js';
import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api'



FlowRouter.route('/', {
  action() {
      Meteor.users.update(Meteor.userId(), {
          $set: {
              "profile.current_channel": null
          }
      });
    mount(App, {content: <ChannelListContainer />});
  }
});

FlowRouter.route('/newchannel', {
  name: 'newchannel',
  action() {

    mount(App, {content: <NewChannel />});
      Meteor.call('getSavedPlaylists', function(err, response) {
          console.log(response);
          Session.set('playlistCount', response.total);
          Session.set('currentPlaylists', response.items);
      });
    mount(App, {content: <NewChannelContainer />});
  }
});

// FlowRouter.route('/songs', {
//   name: 'songs',
//   action() {
//     mount(App, {content: <Songs />});
//   }
// });

FlowRouter.route('/channel/:_id', {
  name:'channel',
  action( params ) {
    //empty search var
    Session.set('searchVal','');
      Meteor.users.update(Meteor.userId(), {
          $set: {
              "profile.current_channel": params._id
          }
      });
    mount(App, {
      content: <ChannelContainer {...params} />
    });
  }
});
