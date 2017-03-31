import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// Nav component - represents a fully styled nav bar
export default class Nav extends Component {

    renderNewChannel(context){
      if(!this.props.loading){
        if(this.props.currentUser !== null){
          return (
            <li>
            <a href={FlowHelpers.pathFor('newchannel')}>New channel</a>
            </li>);
        }
      }
    }

    renderUsername(context){
      if(!this.props.loading){
        if(context.props.currentUser !== null){
          let username = context.props.currentUser.profile.display_name !== null?context.props.currentUser.profile.display_name:context.props.currentUser.profile.id
          return username;
        }
      }
    }

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
                            {this.renderNewChannel(this)}
                            <li>
                              <a href={FlowHelpers.pathFor('profile', {_id: Meteor.userId()}) }>
                                {this.renderUsername(this)}
                              </a>
                            </li>
                            <li><a><AccountsUIWrapper/></a></li>
                        </ul>

                    </div>
                </div>
            </nav>

        )
    }
}
