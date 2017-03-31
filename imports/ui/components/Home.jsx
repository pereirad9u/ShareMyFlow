import React, {Component, PropTypes} from 'react';
import ChannelListContainer from '../containers/ChannelListContainer';

export default class Home extends Component {

    renderHome(context) {
      if(!this.props.loading){
        return (
          <div>
          { Meteor.userId() ?
            <div className="col-lg-12 head"><h1>Channel list : <a
            className="btn icon-btn btn-primary pull-right" href={FlowHelpers.pathFor('newchannel')}>Create
            new channel</a></h1></div>
            : <div className="col-lg-12 head"><h1>Channel list</h1></div>
          }
          <ChannelListContainer />
          </div>
        );
      }
    }

    render() {

        return (
          <div className="componentWrapper">
           {this.renderHome(this)}
          </div>

        );
    }
}

Home.propTypes = {
    loading: PropTypes.bool,
    currentUser: PropTypes.object,
};
