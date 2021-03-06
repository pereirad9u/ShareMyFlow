
import React from 'react';
import {mount} from 'react-mounter';
import { Meteor } from 'meteor/meteor';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../imports/ui/layouts/App.jsx';
import HomeContainer from '../imports/ui/containers/HomeContainer.js';
import ChannelContainer from '../imports/ui/ChannelContainer.js';
import NewChannelContainer from '../imports/ui/NewChannelContainer.js';
import ProfileContainer from '../imports/ui/ProfileContainer.js';
import EditContainer from '../imports/ui/containers/EditContainer.js';

import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api'


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
    //if (Meteor.user().profile.favorite !== undefined){
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.favorite": "Favorite kind of music is not informed"
            }
        });
    //}
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
