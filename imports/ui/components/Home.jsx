import React, {Component, PropTypes} from 'react';
import ChannelListContainer from '../containers/ChannelListContainer';
import {React_Boostrap_Carousel} from 'react-boostrap-carousel';

export default class Home extends Component {

    renderCarousel(context){
      return (
        <div style={{height:350,margin:20}}>
          <React_Boostrap_Carousel animation={true} className="carousel-fade">
            <div style={{height:350,width:"100%",backgroundImage: "url('http://mercymusic.org/wp-content/uploads/2013/04/outreach-slider-for-page.jpg')", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>

            </div>
            <div style={{height:350,width:"100%",backgroundImage:"url('http://www.warnerchappellpm.com/uploads/2015/05/PLAYLISTS-BANNER-REVOLUTION-SLIDER.jpg')", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>

            </div>
            <div style={{height:350,width:"100%",backgroundImage:"url('http://www.smartone-music.fr/wp-content/uploads/2013/06/Slider-Smartone-Music-4.jpg')", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>

            </div>
          </React_Boostrap_Carousel>
        </div>
      )
    }

    renderHome(context) {
      if(!this.props.loading){
        return (
          <div>
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
