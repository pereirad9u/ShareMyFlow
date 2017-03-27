import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish( 'songs', function( searchVal ) {
    check( searchVal, Match.OneOf( String, null, undefined ) );

    let query      = {},
        projection = { limit: 10, sort: { title: 1 } };

    if ( searchVal ) {
      let regex = new RegExp( searchVal, 'i' );

      query = {
        $or: [
          { trackName: regex },
          { artistName: regex },
          { albumName: regex }
        ]
      };

      projection.limit = 100;
    }

    // return nothing if nothing was searched for, otherwise run query in collection
    return searchVal!='' ? Songs.find( query, projection ) : '';
  });
}

Meteor.methods({
  'songs.insert': function ( songsResponse ) {
    // console.log('method found', songsResponse, 'this', this);

    for (var i = 0; i < songsResponse.length; i++) {
      // get spotify ID of track
      let spotifyTrackID = songsResponse[i].id;
      let username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name:Meteor.user().profile.id;
        // check if track exists in db, insert if not
      if (!Songs.findOne({trackID: spotifyTrackID})) {
        console.log()
        Songs.insert({
          trackID     : songsResponse[i].id,
          trackName   : songsResponse[i].name,
          albumID     : songsResponse[i].album.id,
          albumName   : songsResponse[i].album.name,
          artistID    : songsResponse[i].artists[0].id,
          artistName  : songsResponse[i].artists[0].name,
          duration    : songsResponse[i].duration_ms,
          createdAt   : new Date(),
          owner       : this.userId,
          username    : username,
          url         : songsResponse[i].preview_url,
        });
      }
    }
  },
  'songs.dump': function () {
    Songs.remove({});
  }
});
