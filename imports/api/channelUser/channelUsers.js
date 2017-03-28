import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('allUsers', function tasksPublication() {
        return Meteor.users.find({ "status.online": true },{});
    });
}

if (Meteor.isClient){
  var options = {
  showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
  requestPermissions: ['user-read-email'] // Spotify access scopes.
};
Meteor.loginWithSpotify(options, function(err) {
  console.log(err || "No error");
    });
}
