define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _comment = require('text!apps/comments/_common/templates/comment.html');
  var _user = require('text!apps/comments/_common/templates/user.html');

  return Moonrakr.module('CommentsApp.Common.Views', function(Views){

    // The Comment layout view knows how to create a user info view, get the model for that view, and render that view into the correct region
    // That is the most agency I've ever given to a view in Moonrakr (thus far).  It remains to be seen if this is a good idea or whether I should not give the comment view some much agency.  If it is simply a matter of decoupling then I think it is fine.

    // DIFFERENT IDEAS

    // a comment is a nested itemview that knows how to create its child user itemview (and the comments collection works normally)

    // OR

    // a comment is an itemview that consumes two models a comment and a user (and the comments collection works normally)

    // OR

    // a comment is a layout view with an itemview for the user and the collection view of a comment knows to render its "itemViews" by making calls to 'Moonrakr.request('comment:show', id)'


    Views.Comment = Marionette.Layout.extend({
      tagName: 'div',
      template: Handlebars.compile( _comment ),
      regions: {
        userInformation: '.user-information'
      },
      events: {
        'click .user-information': 'userClicked'
      },
      onShow: function(e){
        this.trigger('render:user', this.model.get('userId'));
        // this.renderUser( this.model.get('userId') );
      },
      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get('userId'));
      }
    });

    Views.CommentUser = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

  });

});