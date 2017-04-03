import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {HTTP} from 'meteor/http';
import {Songs} from '../Songs/methods.js';
import {SpotifyWebApi} from 'meteor/xinranxiao:spotify-web-api';
export const Channels = new Mongo.Collection('channels');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish channels that are public or belong to the current user
    Meteor.publish('channels', function channelsPublication() {
        return Channels.find({
            $or: [
                {private: {$ne: true}},
                {owner: this.userId},
                {createdAt: this.createdAt}
            ],
        });
    });
    Meteor.publish('singleChannel', function (id) {
        check(id, String);
        // Make a delay manually to show the loading state
        // Meteor._sleepForMs(1000);
        return Channels.find({_id: id});
    });
}

Meteor.methods({
    'channels.insert'(text, playlist) {
        check(text, String);
        check(playlist, String);
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const nbChannel = Channels.find().count();
        let port = nbChannel;
        let username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name : Meteor.user().profile.id;
        console.log("TEst1 :",playlist);
        let playlists = [];
         Meteor.call('getPlaylistTracks',playlist, function (err, response) {
            playlists = response;
            console.log("erreur : ", err);
            console.log("Playlist ? :reponse : ", response);
        });
         console.log("Playlist apres call",playlists)
        let date = new Date();
        Channels.insert({
            text,
            playlist,
            playlists,
            createdAt: date,
            owner: this.userId,
            username: username,
            portServ: port,
        });
        let channel = Channels.findOne({},{sort: {createdAt: -1,limit : 1}});
        console.log("channel",channel);
        HTTP.get("http://89.80.51.248:21080/index.php?0="+channel.portServ,function(){
            console.log("un truuuuuuuuuc",channel);
            channel.playlists.items.map(function (item) {
                let spotify = new SpotifyWebApi();
                let song = spotify.getTrack(item.track.id);
                //console.log("test",item.track.id)
                //console.log("objet song de spotify",song);
                /*console.log("objet song de spotify",item)*/
                Meteor.call('songs.insert',[song.data.body]);
                let chanSong = Songs.findOne({trackName: song.data.body.name});
                //console.log(chanSong);
                Meteor.call('channelSongs.insert',channel._id,chanSong,channel.portServ);
            });
            HTTP.get("http://89.80.51.248:606"+channel.portServ+"/play");
        });



    },
    'channels.remove'(taskId) {
        check(taskId, String);

        const task = Channels.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }


        Channels.remove(taskId);
    },
    'channels.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        const task = Channels.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Channels.update(taskId, {$set: {checked: setChecked}});
    },
    'channels.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Channels.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Channels.update(taskId, {$set: {private: setToPrivate}});
    },

});
