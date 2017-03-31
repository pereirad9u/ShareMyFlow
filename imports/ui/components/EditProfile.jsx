import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
export default class EditProfile extends Component {

    handleSubmit(e) {
        e.preventDefault();
        if (this.refs.textarea.value != "Write your bio here") {
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    "profile.bio": this.refs.textarea.value
                }
            });
        }
        let i = 1;
        let fav = "";
        while (this.refs.form[i] != undefined) {
            if (this.refs.form[i].checked) {
                fav += this.refs.form[i].value + ", "
            }
            i++;
        }
        fav = fav.substr(0, fav.length - 2)
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.favorite": fav
            }
        });
    }

    renderProfile(context) {
        if (context.props.loading) {
            return (
                <div>
                    <div className="panel panel-info">
                        <div className="panel-heading">Edit profile</div>
                        <div className="panel-body">
                            <div className="row">
                                <div className=" col-md-10 col-md-offset-1">
                                    <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
                                        <h3>Bio : </h3>
                                        <textarea ref="textarea" className="col-md-offset-1" name="bio" cols="90"
                                                  rows="3">{context.props.user.profile.bio != null ? context.props.user.profile.bio : "Write your bio here"}</textarea>

                                        <h3>Choose your favorite kind of music :</h3>
                                        <div className="col-md-5 col-md-offset-1">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" checked={context.props.user.profile.favorite.contains('Rap')? 'checked' : ''} type="checkbox" value="Rap"/>
                                                    Rap
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" checked={context.props.user.profile.favorite.contains('Electro')? 'checked' : ''} type="checkbox"
                                                           value="Electro"/>
                                                    Electro
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Rock')? 'checked' : ''} type="checkbox" value="Rock"/>
                                                    Rock
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains("R'n'B")? 'checked' : ''} type="checkbox" value="R'n'B"/>
                                                    R'n'B
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Blues')? 'checked' : ''} type="checkbox" value="Blue"/>
                                                    Blues
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Pop')? 'checked' : ''} type="checkbox" value="Pop"/>
                                                    Pop
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-offset-1 col-md-5">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Soul')? 'checked' : ''} type="checkbox" value="Soul"/>
                                                    Soul
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Raggae')? 'checked' : ''} type="checkbox" value="Raggae"/>
                                                    Raggae
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Jazz')? 'checked' : ''} type="checkbox" value="Jazz"/>
                                                    Jazz
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Metal')? 'checked' : ''} type="checkbox" value="Metal"/>
                                                    Metal
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Punk')? 'checked' : ''} type="checkbox" value="Punk"/>
                                                    Punk
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"checked={context.props.user.profile.favorite.contains('Funk')? 'checked' : ''} type="checkbox" value="Funk"/>
                                                    Funk
                                                </label>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary col-md-2 col-md-offset-9"
                                               value="Valid"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderProfile(this)}
            </div>
        )
    }
}

EditProfile.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool
};
