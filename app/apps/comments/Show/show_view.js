define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/_common/views');
  var _missingComment = require('text!apps/comments/show/templates/missing_comment.html');

  return Moonrakr.module('CommentsApp.Show', function(Show){

    Show.Comment = Moonrakr.CommentsApp.Common.Views.Comment.extend({
      // wooo
    });

    Show.User = Moonrakr.CommentsApp.Common.Views.CommentUser.extend();

    Show.MissingComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _missingComment )
    });

  });

});