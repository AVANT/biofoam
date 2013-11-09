define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/show/_common/views');
  var _post = require('text!apps/comments/show/foruser/templates/post.html');

  return Moonrakr.module('Comments.Show.ForUser', function(ForUser){

    ForUser.Comment = Moonrakr.Comments.Show.Common.Views.Comment.extend();

    ForUser.MissingComment = Moonrakr.Comments.Show.Common.Views.MissingComment.extend();

    // the only view that is specific to the user comment is the post view part
    ForUser.Post = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _post )
    });

  });

});