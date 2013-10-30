define(function(require){

  var Moonrakr = require('app');
  var _user = require('text!apps/comments/show/post/templates/user.html');

  return Moonrakr.module('CommentsApp.Show.User', function(User){

    // the only view that is specific to the user comment is the post view part

    User.Post = Marionette.ItemView.extend({
      tagName: 'span',
      template: Handlebars.compile( _post )
    });

  });

});