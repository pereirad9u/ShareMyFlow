import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
export default class User extends Component {

    render() {
        console.log(this.props);

        let uriSpotify = 'http://open.spotify.com/user/' + this.props.user.profile.id;
        let username = this.props.user.profile.display_name !== null ? this.props.user.profile.display_name : this.props.user.profile.id;
        const dateFormat = require('dateformat');
        dateFormat.masks.hammerTime = 'dd/mm/yyyy';
        const date = dateFormat(this.props.user.createdAt, "hammerTime");
        return (
            <div>
                <div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            {Meteor.userId() == this.props.user._id ? <a href={FlowHelpers.pathFor('editprofile')}><i className="fa fa-edit fa-pull-right"></i></a> : ""}
                            <h3 className="panel-title">{username}</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                {this.props.user.profile.images[0] !== undefined ?
                                    <div className="col-md-3 col-lg-3 "><img width="200px" height="200px" alt="User Pic"
                                                                             src={this.props.user.profile.images[0].url}
                                                                             className="img-circle img-profile img-responsive"/>
                                    </div> :
                                    <div className="col-md-3 col-lg-3 "><img width="200px" height="200px" alt="User Pic"
                                                                             src="http://www.sac-en-papier.net/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                                                                             className="img-circle img-profile img-responsive"/>
                                    </div>}

                                <div className=" col-md-9 col-lg-9 al">
                                    <table className="table table-user-information">
                                        <tbody>

                                        <tr>
                                            <td>Member since:</td>
                                            <td>{date}</td>
                                        </tr>
                                        <tr>
                                            <td>Favorite kind of music</td>
                                            <td>{this.props.user.profile.favorite !== undefined ? this.props.user.profile.favorite : "Favorite kind of music is not informed"}</td>
                                        </tr>
                                        <tr>
                                            <td>Bio:</td>
                                            <td>{this.props.user.profile.bio !== undefined ? this.props.user.profile.bio : "Bio is not informed"}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="col-md-offset-8">
                                        {this.props.user.profile.current_channel != null ?
                                            <div><a href={"/channel/" + this.props.user.profile.current_channel}
                                               className="btn btn-primary col-md-offset-1">Join in room</a><a href={uriSpotify} className="btn btn-primary" target="_blank">See on
                                            Spotify</a></div> : <a href={uriSpotify} className="btn btn-primary col-md-offset-5" target="_blank">See on
                                            Spotify</a> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


User.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool
};
