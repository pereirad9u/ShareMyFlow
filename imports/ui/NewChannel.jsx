import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
// import { createContainer } from 'meteor/react-meteor-data';


export default class NewChannel extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('channels.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new channels"
        />
      </form>
    )
  }
}
