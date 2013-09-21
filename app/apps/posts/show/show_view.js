define(function(require){
  var Handlebars = require('handlebars');

  var Moonrakr = require('app');
  var _missingPost = require('text!apps/posts/show/templates/missingPost.html');
  var _post = require('text!apps/posts/show/templates/post.html');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.MissingPost = Marionette.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_missingPost)
    });

    Show.Post = Marionette.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_post)
    });
  });
});