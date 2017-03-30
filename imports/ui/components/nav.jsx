import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// Nav component - represents a fully styled nav bar
export default class Nav extends Component {

    render() {
        return (

            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href={FlowHelpers.pathFor('home')}>MyFlow</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><a href={FlowHelpers.pathFor('newchannel')}>New channel</a></li>
                            <li><a href={FlowHelpers.pathFor('profile', {_id: Meteor.userId()}) }>Profile</a></li>
                            <AccountsUIWrapper/>
                        </ul>

                    </div>
                </div>
            </nav>

        )
    }
}
