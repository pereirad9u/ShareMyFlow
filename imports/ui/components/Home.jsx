import React, {Component, PropTypes} from 'react';
import ChannelListContainer from '../containers/ChannelListContainer';
import {React_Boostrap_Carousel} from 'react-boostrap-carousel';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Home extends Component {



    renderCarousel(context){
      return (
        <div style={{height:350,margin:20}}>
          <React_Boostrap_Carousel animation={true} className="carousel-fade">
            <div className="slide" id="slide1">

            </div>
            <div className="slide" id="slide2">

            </div>
            <div className="slide" id="slide3">

            </div>
          </React_Boostrap_Carousel>
        </div>
      )
    }

    renderHome(context) {
      if(!this.props.loading){
        return (
          <div>
          <h1>MyFlow</h1>
          <p>
            A collaborative music listening website using the <a href="https://developer.spotify.com/web-api/">SpotifyAPI</a> and a music streaming server MPD.<br/>
            As soon as you are logged in with your SpotifyAccount you can join a channel or create a new channel.<br/>
            Then you can listen your music with others users.
          </p>
          { Meteor.userId() ?
            <div>
            <div className="col-lg-12 head"><h1>Channel list : <a
            className="btn icon-btn btn-primary pull-right" href={FlowHelpers.pathFor('newchannel')}>Create
            new channel</a></h1></div>
            <ChannelListContainer />
            </div>
            : <div className="col-lg-12 head">{this.renderCarousel(this)}</div>
          }
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
