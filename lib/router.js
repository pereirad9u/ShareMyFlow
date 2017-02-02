
Router.configure({
    layoutTemplate: 'applicationLayout'
});
if (Meteor.isClient) {
    Router.plugin('ensureSignedIn', {
        except: ['homepage', 'atSignIn', 'atSignUp', 'atForgotPassword']
    });
}


Router.route('/', {
    name: 'homepage',
    onBeforeAction: function() {
        if (Meteor.user()) this.redirect('/spotify');
        else this.next();
    }
});

Router.route('/spotify', {
    name: 'spotify'
});/**
 * Created by naay on 13/01/17.
 */
