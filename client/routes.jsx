import React from 'react';
import {mount} from 'react-mounter';
// load AppMain, App, and Channel React components
// import AppMain from '../imports/ui/AppMain.jsx';
import App from '../imports/ui/layouts/App.jsx';
import ChannelListContainer from '../imports/ui/containers/ChannelListContainer.js';

import NewChannel from '../imports/ui/NewChannel.jsx';
import ChannelContainer from '../imports/ui/ChannelContainer.js';


FlowRouter.route('/', {
  action() {
    mount(App, {content: <ChannelListContainer />});
  }
});

FlowRouter.route('/newchannel', {
  name: 'newchannel',
  action() {
    mount(App, {content: <NewChannel />});
  }
});

// FlowRouter.route('/songs', {
//   name: 'songs',
//   action() {
//     mount(App, {content: <Songs />});
//   }
// });

FlowRouter.route('/channel/:_id', {
  name:'channel',
  action( params ) {
    //empty search var
    Session.set('searchVal','');

    mount(App, {
      content: <ChannelContainer {...params} />
    });
  }
});
