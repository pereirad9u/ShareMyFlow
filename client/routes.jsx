import React from 'react';
import {mount} from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/layouts/App.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.js';
import Channel from '../imports/ui/Channel.jsx';
import NewChannel from '../imports/ui/NewChannel.jsx';
import ChannelContainer from '../imports/ui/ChannelContainer.js';
import NewChannelContainer from '../imports/ui/NewChannelContainer.js';
import ProfileContainer from '../imports/ui/ProfileContainer.js';
import Profile from '../imports/ui/Profile.jsx';
import Home from '../imports/ui/components/Home.jsx';
import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api'




FlowRouter.route('/', {
  action() {
      Meteor.users.update(Meteor.userId(), {
          $set: {
              "profile.current_channel": null
          }
      });
    mount(App, {content: <Home />});
  }
});

FlowRouter.route('/profile/:_id', {
    name:'profile',
    action(params) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.current_channel": null
            }
        });
        mount(App, {content: <ProfileContainer {...params}/>});
    }
});

FlowRouter.route('/newchannel', {
  name: 'newchannel',
  action() {


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
        /*console.log("paramsid",params._id);
      Meteor.call('getPlaylistTracks', params._id, function(err, response){
        console.log("erreur : ",err);
        console.log("Playlist ? :reponse : ",response);
      });*/
    mount(App, {
      content: <ChannelContainer {...params} />
    });
  }
});
