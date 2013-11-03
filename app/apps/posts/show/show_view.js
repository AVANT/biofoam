define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _missingPost = require('text!apps/posts/show/templates/missing_post.html');
  var _post = require('text!apps/posts/show/templates/post.html');
  var _postLayout = require('text!apps/posts/show/templates/post_layout.html');

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
    });

    Show.PostLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _postLayout ),
      regions: {
        postRegion: '#post-region',
        commentsRegion: '#comments-region'
      }
    })


  });
});