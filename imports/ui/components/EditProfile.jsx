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
        let i = 0;

        let fav = "";
        while (this.refs.genderInput.children[i] != undefined) {
            if (this.refs.genderInput.children[i].children[0].checked) {
                fav += this.refs.genderInput.children[i].children[0].defaultValue + ", "
            }
            i++;
        }
        fav = fav.substr(0, fav.length - 2)
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.favorite": fav
            }
        });

        FlowRouter.go('profile', {_id:Meteor.userId()});
    }

    renderMusicGender(context){
      let genders = ['Rap','Electro','Rock','R\'n\'B', 'Blues','Pop', 'Soul', 'Reggae', 'Jazz', 'Metal', 'Punk', 'Funk'];
      return genders.map(function(gender){
        //console.log(gender);
        return(
          <div className="container col-md-3">
            <input className="input-fav" type="checkbox" id={gender} value={gender} />
            {gender}
          </div>
        );
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
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <h3>Bio : </h3>
                                        <textarea ref="textarea" className="col-md-offset-1" name="bio" cols="90"
                                                  rows="3">{context.props.user.profile.bio != null ? context.props.user.profile.bio : "Write your bio here"}</textarea>

                                        <h3>Choose your favorite kind of music :</h3>
                                        <div ref="genderInput">
                                        {this.renderMusicGender(this)}
                                        </div>
                                        <input id="btn-edit" type="submit" className="btn btn-primary col-md-2 col-md-offset-9"
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
