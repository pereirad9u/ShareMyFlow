import React, {Component, PropTypes} from 'react';
import ChannelListContainer from '../containers/ChannelListContainer';

export default class Home extends Component {

    render() {
        {console.log('home props',Meteor.userId())}
        return (
            <div className="componentWrapper">
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

