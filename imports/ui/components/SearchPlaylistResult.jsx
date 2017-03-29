
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class SearchPlaylistResult extends Component {



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
};

