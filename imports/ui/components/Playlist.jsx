
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';



export default class Playlist extends Component {

    getPlaylist(){
        Meteor.call('playlist');
    }

    render(){
        let playlist = this.props.playlist;
        return (
            <p>
                {playlist}
            </p>
        );

    }




}


Playlist.propTypes = {
    playlist : PropTypes.array.isRequired
}