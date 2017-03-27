import React, { Component, PropTypes } from 'react';
import { ChannelChats } from '../../api/channelChat/channelChats.js';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
// Task component - represents a single todo item
export default class ChannelChat extends Component {

    scrollToBottom(){
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({behavior: "smooth"});
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('channelChats.report', this.props.task._id, Meteor.userId);
    }

    deleteThisTask() {
        Meteor.call('channelChats.remove', this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('channelChats.setPrivate', this.props.task._id, ! this.props.task.private);
    }


    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS

        let owner =false;
        if(this.props.task.owner == Meteor.userId()){
            owner = true;
        }
        const isReport=this.props.task.reportedBy.includes(Meteor.userId()) ;
        const dateFormat = require('dateformat');
        dateFormat.masks.hammerTime = 'HH:MM ';
        const date = dateFormat(this.props.task.createdAt, "hammerTime");
        return (
            <li className="list-group-item">
                <span className="pull-right">
                    <span className={owner? "delete" : "delete hide"}
                    onClick={this.deleteThisTask.bind(this)}
                    > &times;
                    </span>
                </span>


                        <i id={this.props.task._id}
                           className={isReport ?  'fa fa-thumbs-down' : 'fa fa-thumbs-o-down' }
                           onClick={this.toggleChecked.bind(this)}
                           title="signaler ce message"
                        > </i>

                <label>{this.props.task.reported}</label>
                <label>({date})</label>




                <span className="text">
                 <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
                <div style={ {float:"left", clear: "both"} } ref={(el) => { this.messagesEnd = el; }}></div>
            </li>
        );
    }
}

ChannelChat.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired,
};


//buton private/public
/*
 const taskClassName = classnames({
 checked: this.props.task.checked,
 private: this.props.task.private,
 });


{ this.props.showPrivateButton ? (
 <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
 { this.props.task.private ? 'Private' : 'Public' }
 </button>
 ) : ''}*/
