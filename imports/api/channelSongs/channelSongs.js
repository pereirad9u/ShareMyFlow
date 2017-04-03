import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Channels} from '../channels/channels.js';
export const ChannelSongs = new Mongo.Collection('channelSongs');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('channelSongs', function tasksPublication() {
        return ChannelSongs.find({
            $or: [
                {private: {$ne: true}},
                {owner: this.userId},
            ],
        }, {sort: {rate: 1}});
    });
}

Meteor.methods({
    'channelSongs.removeAllChannelSongs'() {
        ChannelSongs.remove({});
    },
    'channelSongs.insert'(channelId, text, channelPort) {
        check(channelId, String);
        check(text, Object);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        text.username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name : Meteor.user().profile.id;
        text.channelId = channelId;
        text.createdAt = new Date();
        text.owner = this.userId;
        text.rate = 0;
        text.ratedBy=new Array();
        ChannelSongs.insert(
            text
        );
        //ne faites pas sa chez vous
        HTTP.post("http://89.80.51.248:606" + channelPort + "/add", {
            data: {"entry": text.url},
            options: {headers: 'Access-Control-Allow-Origin : *'}
        }, function (error, result) {
            if (!error) {
                console.log("ok")
            }
        })

    },
    'channelSongs.remove'(taskId) {
        check(taskId, String);

        const task = ChannelSongs.findOne(taskId);
        let channelCur = Channels.findOne(task.channelId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        let listSong = channelCur.playlists.items;
        let place = 0;
        while (listSong[place].id != taskId || place < listSong.length-1){
            place ++;
        }
        HTTP.get("http://89.80.51.248:606"+channelCur.portServ+"/rmqueue/"+place);
        ChannelSongs.remove(taskId);
    },
    'channelSongs.rateMoins'(trackId) {
        check(trackId, String);
        const track = ChannelSongs.findOne(trackId);
        const user = Meteor.userId();
        console.log(track);

        if(track.ratedBy.includes(user)==false){
            if(track.ratedBy-1 <= -10) {
                ChannelSongs.remove(trackId)
            }else{
                track.rate--;

                ChannelSongs.update(trackId,{ $set: {rate : track.rate}});
                ChannelSongs.update(trackId,  {$push: {ratedBy : user}});
                console.log(trackId);
            }
        }
    },
    'channelSongs.ratePlus'(trackId) {
        check(trackId, String);
        const track = ChannelSongs.findOne(trackId);
        const user = Meteor.userId();
        console.log(track);

        if(track.ratedBy.includes(user)==false){
                track.rate++;
                ChannelSongs.update(trackId,{ $set: {rate : track.rate}});
                ChannelSongs.update(trackId,  {$push: {ratedBy : user}});
                console.log(trackId);
        }
    }
});
