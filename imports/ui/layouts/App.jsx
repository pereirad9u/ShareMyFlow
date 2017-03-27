import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// import { Tasks } from '../api/tasks.js';
//
// import Task from './Task.jsx';
// import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

import Nav from '../components/nav.jsx';

import styles from '../styles/bootstrap-base.min.css';
import stylesLab from '../styles/bootstrap-spacelab.min.css';

// App component - represents the whole app
export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     hideCompleted: false,
  //   };
  // }

  // toggleHideCompleted() {
  //   this.setState({
  //     hideCompleted: !this.state.hideCompleted,
  //   });
  // }
        // <header>
        //   <AccountsUIWrapper />
        // </header>


  render() {
    return (
      <div>

        <Nav />
        <div className='container'>
        {this.props.content}
        </div>
      </div>
    );
  }
}

// App.propTypes = {
//   currentUser: PropTypes.object,
// };
//
// export default createContainer(() => {
//
//   return {
//     currentUser: Meteor.user(),
//   };
// }, App);
