define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _comment = require('text!apps/comments/show/templates/comment.html');
  var _user = require('text!apps/comments/show/templates/user.html');
  var _missingComment = require('text!apps/comments/show/templates/missing_comment.html');

  return Moonrakr.module('CommentsApp.Show', function(Show){

    Show.Comment = Marionette.Layout.extend({
      tagName: 'div',
      template: Handlebars.compile( _comment ),
      regions: {
        userInformation : '.user-information'
      },
      events: {
        'click .user-information': 'userClicked'
      },

      onShow: function(){
        this.trigger('render:user', this.model.get('userId'));
      },

      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get('userId'));
      }

    });

    Show.User = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

    Show.MissingComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _missingComment )
    });

  });

});