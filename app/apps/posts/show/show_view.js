define(function(require){
  var Handlebars = require('handlebars');

  var Moonrakr = require('app');
  var _missingPost = require('text!apps/posts/show/templates/missing-post.html');
  var _post = require('text!apps/posts/show/templates/post.html');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.MissingPost = Moonrakr.Common.Views.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_missingPost)
    });

    Show.Post = Moonrakr.Common.Views.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_post),
      events: {
        'click a.js-edit': 'editClicked'
      },

      editClicked: function(e){
        e.preventDefault();
        this.trigger('post:edit', this.model);
      }
    }); // Show.Post
  });
});