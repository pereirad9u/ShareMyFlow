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
        Meteor.call('channels.insert', text, this.playlist);
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderPlaylist() {
        if (!this.props.loading) {
            let filteredPlaylist = this.props.playlist;
            return filteredPlaylist.map((playlist) => {
                    return (
                      <div className="col-md-3">
                        <div className="container">

                            <h4>{playlist.name}</h4>
                            <label>
                              <input name="playlist" type="radio" id={playlist.id} ref="playlistInput" value={playlist.id} />
                              
                              {playlist.images[0] !== undefined ? <img className="playlist_img img-responsive img-thumbnail" alt={playlist.name} src={playlist.images[0].url}/>
                              : <img className="img-responsive img-thumbnail" src="https://placehold.it/150x150"/>}
                            </label>

                        </div>
                      </div>
                    );
                });
            }
    }

    render() {
        return (
            <div>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label for="newChannelTitle">Channel Title</label>
                      <input
                        id="newChannelTitle"
                        className="form-control"
                        type="text"
                        ref="textInput"
                        placeholder="Type the new of your new channel"
                        />
                    </div>
                  </div>
                    <div className="row">
                      {this.renderPlaylist()}
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                      </div>
                      <div className="col-md-2">
                      <button className="btn btn-primary btn-lg" type="submit">Créer le channel</button>
                      </div>
                    </div>
            </form>


            </div>




        )
    }
};


NewChannel.propTypes = {
    playlist:PropTypes.array.isRequired,
    loading : PropTypes.bool
};

