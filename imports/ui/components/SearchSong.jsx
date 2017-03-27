import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import '../../api/Songs/methods.js';

// Channels component - represents the rendering of channels
export default class SearchSong extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.searchInput).value.trim();
    // set a session var to search the Song collection later
    Session.set('searchVal',text);

    // call the search tracks method to insert results in to the DB
    if (Meteor.isClient) {
      Meteor.call('searchTracks', text, function(err, response) {
        // console.log('searchResponse', response);
      });
    }
  }

  render() {
    return (
      <div className="componentWrapper">


        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input
            className="form-control"
            type="text"
            ref="searchInput"
            placeholder="Search for a song"
          />
        </form>





      </div>

    );
  }

};
