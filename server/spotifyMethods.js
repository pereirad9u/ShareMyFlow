import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api';

import {Songs} from '../imports/api/Songs/methods.js';
import {Channels} from '../imports/api/channels/channels.js';

export const SpotifyResponses = new Mongo.Collection('spotifyResponses');

Meteor.publish('spotifyResponses', function spotifyResponsesPublication() {
    return SpotifyResponses.find({});
});

Meteor.methods({
    searchTracks: function (searchPattern) {
// console.log('invoked');


        console.log('in collection results', Songs.find().count());

        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.searchTracks(searchPattern, {limit: 5, offset: 1});

        //check if error was returned above
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.searchTracks(searchPattern, {limit: 5, offset: 1});
        }

        SpotifyResponses.insert({
            response,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });

        // error handle here instead of ternary response

        if (response.data.body.tracks) {
            //insert responses into songs collection
            var responseItems = response.data.body.tracks.items;

            Meteor.call('songs.insert', responseItems);
        }

        return responseItems ? responseItems : response;
    },

    getSavedPlaylists: function () {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});
        console.log(response);
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});
        }
        return response.data.body;
    },

    getPlaylistTracks: function(id){
      var spotifyApi = new SpotifyWebApi();
      //var channel = Channels.find(id).fetch();
      //var playlist = channel[0].playlist;
      //console.log("id plaaaaaaaaylist");
      let response = spotifyApi.getPlaylistTracks("spotify", id, {});
      let username =  Meteor.user().profile.id;
      console.log("test resp",response);
      if(response.data == undefined){
          console.log("user 1", username)
          console.log("id 1", id)

          response = spotifyApi.getPlaylistTracks(username, id, {});
          console.log("undef 1", response)
      }
      //console.log("id user",Meteor.user().services.spotify.id);
      if (checkTokenRefreshed(response, spotifyApi)) {
          response = spotifyApi.getPlaylistTracks("spotify", id, {});
          if(response.data == undefined){
              response = spotifyApi.getPlaylistTracks(username, id, {});
              console.log("undef 2")
          }
      }
      console.log("réponse de spotify",response.data.body);
      return response.data.body;


    }


});



var checkTokenRefreshed = function (response, api) {
    if (response.error && response.error.statusCode === 401) {
        api.refreshAndUpdateAccessToken();
        return true;
    } else {
        return false;
    }
};

ServiceConfiguration.configurations.update(
    {"service": "spotify"},
    {
        $set: {
            "clientId": "b47d1df59a8d459eb0f0daad46e4311f",
            "secret": "835e9fca63034e6996f3aa7b4c03896a"
        }
    },
    {upsert: true}
);
