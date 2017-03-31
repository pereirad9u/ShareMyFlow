
import React from 'react';
import {mount} from 'react-mounter';
import { Meteor } from 'meteor/meteor';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../imports/ui/layouts/App.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.js';
import HomeContainer from '../imports/ui/containers/HomeContainer.js';
import Channel from '../imports/ui/Channel.jsx';
import NewChannel from '../imports/ui/NewChannel.jsx';
import ChannelContainer from '../imports/ui/ChannelContainer.js';
import NewChannelContainer from '../imports/ui/NewChannelContainer.js';
import ProfileContainer from '../imports/ui/ProfileContainer.js';
import Profile from '../imports/ui/Profile.jsx';
import Home from '../imports/ui/components/Home.jsx';
import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api'
import EditProfile from "../imports/ui/containers/EditContainer";


FlowRouter.route('/', {
    name: 'home',
    action() {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.current_channel": null
            }
        });
        mount(App, {content: <HomeContainer />});
    }

});

FlowRouter.route('/profile/:_id', {
    name: 'profile',
    action(params) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.current_channel": null
            }
        });
        mount(App, {content: <ProfileContainer {...params}/>});
    }
});

FlowRouter.route('/edit', {
    name: 'editprofile',
    action() {
        mount(App, {content: <EditContainer />});
    }
});

FlowRouter.route('/newchannel', {
    name: 'newchannel',
    action() {


        Meteor.call('getSavedPlaylists', function (err, response) {
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

FlowRouter.notFound = {
    action() {
        FlowRouter.go(FlowHelpers.pathFor('home'));
    }
};
