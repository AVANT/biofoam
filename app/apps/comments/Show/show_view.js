define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _comment = require('text!apps/comments/show/templates/comment.html');
  var _user = require('text!apps/comments/show/templates/user.html');

  return Moonrakr.module('Comments.Show', function(Show){

    Show.Comment = Marionette.Layout.extend({
      tagName: 'div',
      template: Handlebars.compile( _comment ),
      regions: {
        userInformation : '.user-information'
      },
      events: {
        'click .user-information': userClicked
      },

      // have the comment controller fetch the model for the comment? TRY THIS.

      onShow: function(){
        // GET user model from id
        this.trigger('render:user');
      },

      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get( 'userId' ));
      }

    });

    Show.User = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

  });

});