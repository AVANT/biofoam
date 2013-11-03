define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/show/_common/views');
  var _user = require('text!apps/comments/show/forpost/templates/user.html');

  return Moonrakr.module('CommentsApp.Show.ForPost', function(ForPost){

    ForPost.Comment = Moonrakr.CommentsApp.Show.Common.Views.Comment.extend();

    ForPost.MissingComment = Moonrakr.CommentsApp.Show.Common.Views.MissingComment.extend();

    // the only view that is specific to the post comment is the user part
    ForPost.User = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

  });

});