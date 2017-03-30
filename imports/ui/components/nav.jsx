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
                        <a className="navbar-brand" href="../">MyFlow</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href={FlowHelpers.pathFor('newchannel')}>New channel</a></li>
                            <li><a href={FlowHelpers.pathFor('profile', {_id: Meteor.userId()}) }>Profile</a></li>
                            <ul className="nav navbar-nav navbar-right">
                                <li><AccountsUIWrapper /></li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
