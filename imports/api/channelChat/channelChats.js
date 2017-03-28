import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ChannelChats = new Mongo.Collection('channelChats');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('channelChats', function tasksPublication() {
        return ChannelChats.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });


}
Meteor.methods({
    'channelChats.insert'(channelId, text) {
        check(channelId, String);
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }



        ChannelChats.insert({
            text,
            channelId  : channelId,
            reported   : 0,
            reportedBy : new Array(),
            username   : Meteor.user().profile.display_name !== null?Meteor.user().profile.display_name:Meteor.user().profile.id,
            createdAt  : new Date(),
            owner      : this.userId,
        });
    },
    'channelChat.remove'(taskId) {
        check(taskId, String);
        const task = ChannelChats.findOne(taskId);
        if (task && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        ChannelChats.remove(taskId);
    },
    'channelChat.report'(taskId) {
        check(taskId, String);
        const task = ChannelChats.findOne(taskId);
        const user = Meteor.userId();
        console.log(task);

        if(task.reportedBy.includes(user)==false){
            if(task.reported >= 10) {
                ChannelChats.remove(taskId)
            }else{
                task.reported++;

                ChannelChats.update(taskId,{ $set: {reported : task.reported}});
                ChannelChats.update(taskId,  {$push: {reportedBy : user}});
                console.log(taskId);

                document.getElementById(taskId).className= "fa fa-thumbs-down"
            }
        }
    },
    'channelChat.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = ChannelChats.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        ChannelChats.update(taskId, { $set: { private: setToPrivate } });
    },
});
