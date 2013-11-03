define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/show/_common/views');
  var _post = require('text!apps/comments/show/user/templates/post.html');

  return Moonrakr.module('CommentsApp.Show.User', function(User){

    User.Comment = Moonrakr.CommentsApp.Show.Common.Views.Comment.extend();

    User.MissingComment = Moonrakr.CommentsApp.Show.Common.Views.MissingComment.extend();

    // the only view that is specific to the user comment is the post view part
    User.Post = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _post )
    });

  });

});