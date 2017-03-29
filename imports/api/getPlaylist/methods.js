/**
 * Created by debian on 28/03/17.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api'


Meteor.methods({

    /**
    getSavedPlaylists: function() {
        let spotifyApi = new SpotifyWebApi();
        let response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});

        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});
        }

        return response.data.body;
    },
    getPlaylistTracks : function (userId,playlistId) {
        let spotifyApi = new SpotifyWebApi();
        let response = spotifyApi.getPlaylistTracks(userId,playlistId).data.body;
        return response;
    }*/



});

var checkTokenRefreshed = function(response, api) {
    if (response.error && response.error.statusCode === 401) {
        api.refreshAndUpdateAccessToken();
        return true;
    } else {
        return false;
    }
}
