/**
 * Created by debian on 28/03/17.
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

export const Playlist = new Mongo.Collection('playlist');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish( 'playlist', function() {
        return  Playlist.find();
    });

}



Meteor.methods({
    'playlist.insert': function ( playlistResponse ) {
        // console.log('method found', songsResponse, 'this', this);

        for (var i = 0; i < playlistResponse.length; i++) {
            // get spotify ID of track
            let spotifyTrackID = playlistResponse[i].id;
            let username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name:Meteor.user().profile.id;
            // check if track exists in db, insert if not
            if (!Playlist.findOne({trackID: spotifyTrackID})) {
                console.log()
                Playlist.insert({
                    trackID     : playlistResponse[i].id,
                    trackName   : playlistResponse[i].name,
                    albumID     : playlistResponse[i].album.id,
                    albumName   : playlistResponse[i].album.name,
                    artistID    : playlistResponse[i].artists[0].id,
                    artistName  : playlistResponse[i].artists[0].name,
                    duration    : playlistResponse[i].duration_ms,
                    createdAt   : new Date(),
                    owner       : this.userId,
                    username    : username,
                    url         : playlistResponse[i].preview_url,
                });
            }
        }
    },

});