import React, {Component, PropTypes} from "react";
import {Meteor} from 'meteor/meteor';
import User from '../ui/components/User';

export default class Profile extends Component {

    renderProfile(context) {
        if (context.props.loading) {
            return (<User user={context.props.user}

            />)
        }
    }

    renderChannels(context) {
        if (context.props.loading) {
            let username = this.props.user.profile.display_name !== null ? this.props.user.profile.display_name : this.props.user.profile.id;
            return (
                <div>
                    <h3>{username}'s channels :</h3><br/>
                    <ChannelListContainer />
                </div>)
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.renderProfile(this)}
                    {this.renderChannels(this)}
                </div>
            </div>
        )
    }
};


Profile.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool
};