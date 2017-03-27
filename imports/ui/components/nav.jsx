import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
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
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><AccountsUIWrapper /></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
