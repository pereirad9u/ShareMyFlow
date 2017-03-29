
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import '../../api/Playlist/methods.js';

export default class SearchPlaylist extends Component {


    handleSubmit(event){
        event.preventDefault();
        console.log("demes couilles")
        if(Meteor.isClient){

            Meteor.call('playlist');

        }
    }

    render(){
        return (
            <div className="componentWrapper">
                <button onClick={this.handleSubmit.bind(this)}></button>
            </div>
        )
    }

}
