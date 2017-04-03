import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import EditProfile from '../components/EditProfile';

export default EditContainer = createContainer(() => {


    const profileHandler = Meteor.subscribe('users');
    const loading = profileHandler.ready();
    const user = Meteor.users.findOne(Meteor.userId());
    return {
        user : user,
        loading : loading
    }
}, EditProfile);

