import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import Channels from '../api/channels/channels.js';
import SearchPlaylist from './components/SearchPlaylist.jsx';
// import { createContainer } from 'meteor/react-meteor-data';


export default class NewChannel extends Component {

    setPlaylist(event) {
        this.playlist = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();


        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();


        console.log("Nchan befor insert :", this.playlist);
        Meteor.call('channels.insert', text, this.playlist);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderPlaylist() {
        if (!this.props.loading) {
            let filteredPlaylist = this.props.playlist;
            return filteredPlaylist.map((playlist) => {

                return (
                    <div className="container" onChange={this.setPlaylist.bind(this)}>

                        <h4>{playlist.name}</h4>
                        {playlist.images[0] !== undefined ? <img className="playlist_img" alt={playlist.name} src={playlist.images[0].url}/>
                            : <img src="https://placehold.it/150x150"/>}

                        <input name="playlist"
                               type="radio" id={playlist.id}
                               ref="playlistInput" value={playlist.id}/>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Type to add new channels"
                    />
                    <div className="list-group">
                        {this.renderPlaylist()}
                    </div>

                    <button type="submit">Créer le channel</button>
                </form>

            </div>




        )
    }
};


NewChannel.propTypes = {
    playlist: PropTypes.string.isRequired,
    loading: PropTypes.bool
};