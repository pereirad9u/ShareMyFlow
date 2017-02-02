import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    ServiceConfiguration.configurations.update(
        { "service": "spotify" },
        {
            $set: {
                "clientId": "b47d1df59a8d459eb0f0daad46e4311f",
                "secret": "835e9fca63034e6996f3aa7b4c03896a"
            }
        },
        { upsert: true }
    );
});

Meteor.methods({

    typeaheadTracks: function(query, options) {
        console.log('ok')
        options = options || {};

        // guard against client-side DOS: hard limit to 50
        if (options.limit) {
            options.limit = Math.min(6, Math.abs(options.limit));
        } else {
            options.limit = 6;
        }

        // Spotify call.
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.searchTracks(query, { limit: options.limit });

        // Need to refresh token
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.searchTracks(query, { limit: options.limit });
        }

        return response.data.body.tracks.items;
    },
    createPlaylist: function(selectedTracks, playlistName) {
        if (!selectedTracks || !playlistName || selectedTracks.length > 20) throw new Error("No tracks or playlist name specified");

        // Call
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, { public: false });

        // Need to refresh token
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, { public: false });
        }

        // Put songs into the playlist.
        var uris = selectedTracks.map(function(track) {
            return track.uri;
        });
        spotifyApi.addTracksToPlaylist(Meteor.user().services.spotify.id, response.data.body.id, uris, {});

        return response.data.body;
    },
    getFollowerCount: function() {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getMe();
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getMySavedTracks({});
        }

        return response.data.body.followers.total;

    },
    getSavedTracksCount: function() {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getMySavedTracks({});
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getMySavedTracks({});
        }
;        return response.data.body.total;
    },
    getSavedPlaylists: function() {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});

        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});
        }

        return response.data.body;
    }
});

var checkTokenRefreshed = function(response, api) {
    if (response.error && response.error.statusCode === 401) {
        api.refreshAndUpdateAccessToken();
        return true;
    } else {
        return false;
    }
}



