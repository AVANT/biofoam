define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/show/_common/views');
  var _user = require('text!apps/comments/show/forpost/templates/user.html');

  return Moonrakr.module('Comments.Show.ForPost', function(ForPost){

    ForPost.Comment = Moonrakr.Comments.Show.Common.Views.Comment.extend({
      events: {
        'click .user-information': 'userClicked'
      },
      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get('userId'));
      }
    });

    ForPost.MissingComment = Moonrakr.Comments.Show.Common.Views.MissingComment.extend();

    ForPost.CMSPanel = Moonrakr.Comments.Show.Common.Views.CMSPanel.extend();

    // the only view that is specific to the post comment is the user part
    ForPost.User = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

  });

});