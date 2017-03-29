import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { SpotifyWebApi } from 'meteor/spotify-web-api'

Meteor.methods({
  getSavedTracksCount: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getMySavedTracks({});
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getMySavedTracks({});
    }

    return response.data.body.total;
  },
  getArtistAlbums: function () {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {}, function(err, result) {
      console.log(result);
    });
  },
});




var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
}
