define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/show/_common/views');
  var _user = require('text!apps/comments/show/post/templates/user.html');

  return Moonrakr.module('CommentsApp.Show.Post', function(Post){

    Post.Comment = Moonrakr.CommentsApp.Show.Common.Views.Comment.extend();

    Post.MissingComment = Moonrakr.CommentsApp.Show.Common.Views.MissingComment.extend();

    // the only view that is specific to the post comment is the user part
    Post.User = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _user )
    });

  });

});