import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Profile from './Profile.jsx';

export default ProfileContainer = createContainer(({_id}) => {


    const profileHandler = Meteor.subscribe('users');
    const loading = profileHandler.ready();

    console.log(_id);
    const user = Meteor.users.findOne({_id : _id});
    console.log("user",user);
    return {
        user : user,
        loading : loading
    }
}, Profile);

