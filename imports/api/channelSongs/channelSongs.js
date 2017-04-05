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
        }, {sort: {order: 1}});
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
        let chan = Channels.findOne(channelId);
        let order;
        chan.playlists.items.map(function(){
            order++;
        });
        text.username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name : Meteor.user().profile.id;
        //text.channelId = channelId;
        text.createdAt = new Date();
        text.owner = this.userId;
        text.order = order+1;
        text.ratedBy = [];
        text.rate =0;
        ChannelSongs.insert({
            text,
            channelId
        },function(err, res){
          if(err){
            console.log("erreur", err );
          }
          if (res){
            console.log("result", res);
          }
        });
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
    'channelSongs.insertAll'(channelId, data, channelPort) {
        check(channelId, String);
        check(data, Array);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        let liens =[];
        let order = 1;
        console.log("on s'apprete à inserer dans channelSongs ça :", data);
        data.map(function (text) {
            console.log("la on insert dans channelSongs",text);
            text.username = Meteor.user().profile.display_name !== null ? Meteor.user().profile.display_name : Meteor.user().profile.id;
            text.createdAt = new Date();
            text.owner = Meteor.userId();
            text.order = order;
            text.ratedBy = [];
            text.rate =0;
            ChannelSongs.insert({
                text,
                channelId
            });
            if(text.url != null){
                liens.push(text.url)
            }
            order++;

        });
        let channel = Channels.findOne(channelId);
        console.log(liens);

        //ne faites pas sa chez vous

        HTTP.post("http://89.80.51.248:606" + channelPort + "/addall", {
            data: {"entries": liens},
            options: {headers: 'Access-Control-Allow-Origin : *'}
        }, function (error, result) {
            if (!error) {
                console.log("ok")

                HTTP.get("http://89.80.51.248:606"+channelPort+"/play",function () {
                    Meteor.call('channels.next',channelId);
                });

                //Meteor.call('channelSongs.stopWait');

            }else{
                console.log("insertAll", error)

            }
        });

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

        let trouver = false;
        while (trouver == false){

            if(listSong[place].track.id == task.text.trackID){
                console.log("Trouver")
                trouver =true;
            }else{
                place ++;
            }
        }

        HTTP.get("http://89.80.51.248:606"+channelCur.portServ+"/rmqueue/"+place, function () {
            console.log("j'ai calback bb")
        });
        channelCur.playlists.items.splice(place,1);
        Channels.update(channelCur._id,{ $set: {playlists : channelCur.playlists}});
        let chanS = ChannelSongs.findOne(taskId);
        ChannelSongs.remove(taskId);
        let chanUpdateOrder = ChannelSongs.find({"channelId": channelCur._id}).fetch();
        chanUpdateOrder.map(function(item){
            if(item.text.order>chanS.text.order){
                item.text.order--;
                ChannelSongs.update(item._id,{$set: {"text.order" : item.text.order}});
            }
        });
    },
    'channelSongs.removeCurr'(channelId) {
        check(channelId, String);
        let channelCur = Channels.findOne(channelId);
        let listSong = channelCur.playlists.items;


        let chanS = ChannelSongs.findOne({"text.trackID" : listSong[0].track.id, "channelId": channelCur._id});
        ChannelSongs.remove(chanS._id);
        channelCur.playlists.items.splice(0,1);
        Channels.update(channelCur._id,{ $set: {playlists : channelCur.playlists}});
        channelCur = Channels.findOne(channelId);
        let chanUpdateOrder = ChannelSongs.find({"channelId": channelCur._id}).fetch();
        chanUpdateOrder.map(function(item){
           item.text.order--;
           ChannelSongs.update(item._id,{$set: {"text.order" : item.text.order}});
        });
    },
    'channelSongs.rateMoins'(trackId) {
        check(trackId, String);
        const track = ChannelSongs.findOne(trackId);
        const user = Meteor.userId();

        if(track.text.ratedBy.includes(user)==false){
            if(track.text.ratedBy-1 <= -10) {
                ChannelSongs.remove(trackId)
            }else{
                track.text.rate--;

                ChannelSongs.update(trackId,{ $set: {'text.rate' : track.text.rate}});
                ChannelSongs.update(trackId,  {$push: {'text.ratedBy' : user}});
            }
        }
    },
    'channelSongs.ratePlus'(trackId) {
        check(trackId, String);
        const track = ChannelSongs.findOne(trackId);
        const user = Meteor.userId();

        if(track.text.ratedBy.includes(user)==false){
            track.text.rate++;
            ChannelSongs.update(trackId,{ $set: {'text.rate' : track.text.rate}});
            ChannelSongs.update(trackId,  {$push: {'text.ratedBy' : user}});
        }
    },

});
