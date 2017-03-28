import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Channels = new Mongo.Collection('channels');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish channels that are public or belong to the current user
  Meteor.publish('channels', function channelsPublication() {
    return Channels.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
  Meteor.publish('singleChannel', function(id) {
    check(id, String);
    // Make a delay manually to show the loading state
    // Meteor._sleepForMs(1000);
    return Channels.find({_id: id});
  });
}

Meteor.methods({
  'channels.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const nbChannel = Channels.find().count();
    let port = nbChannel;
    let username =Meteor.user().profile.display_name !== null?Meteor.user().profile.display_name:Meteor.user().profile.id;


        Channels.insert({
        text,
        createdAt: new Date(),
        owner: this.userId,
        username: username,
        portServ : port,
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

    Channels.update(taskId, { $set: { checked: setChecked } });
  },
  'channels.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Channels.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Channels.update(taskId, { $set: { private: setToPrivate } });
  },
});
