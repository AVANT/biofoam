define(function(require){
  var Handlebars = require('handlebars');

  var Moonrakr = require('app');
  var _post = require('text!apps/posts/show/templates/post.html');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.Post = Marionette.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_post)
    });
  });
});