import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ChannelSongs = new Mongo.Collection('channelSongs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('channelSongs', function tasksPublication() {
    return ChannelSongs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    }, { sort: { order: 1 } });
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
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    text.username =Meteor.user().profile.display_name !== null?Meteor.user().profile.display_name:Meteor.user().profile.id;
    text.channelId  = channelId;
    text.createdAt  = new Date();
    text.owner      = this.userId;
    ChannelSongs.insert(
      text
    );
    //ne faites pas sa chez vous
    HTTP.post("http://89.80.51.248:606"+channelPort+"/add",{data:{"entry":text.url},options:{headers:'Access-Control-Allow-Origin : *'}},function (error,result){ if (!error){console.log("ok")}})

  },
  'channelSongs.remove'(taskId) {
    check(taskId, String);

    const task = ChannelSongs.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    ChannelSongs.remove(taskId);
  },
});
