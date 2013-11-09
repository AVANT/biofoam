define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _missingPost = require('text!apps/posts/show/templates/missing_post.html');
  var _post = require('text!apps/posts/show/templates/post.html');
  var _cms_panel = require('text!apps/posts/show/templates/cms_panel.html');
  var _postLayout = require('text!apps/posts/show/templates/post_layout.html');

  return Moonrakr.module('PostsApp.Show', function(Show){

    Show.MissingPost = Moonrakr.Common.Views.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_missingPost)
    });

    Show.Post = Moonrakr.Common.Views.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_post)
    });

    Show.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 3, // 3=authors
      template: Handlebars.compile( _cms_panel ),
      events: {
        'click .js-edit' : 'editClicked'
      },
      editClicked: function(e){
        e.preventDefault();
        this.trigger('post:edit')
      }
    });

    Show.PostLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _postLayout ),
      regions: {
        cmsRegion: '#cms-region',
        postRegion: '#post-region',
        commentsRegion: '#comments-region'
      }
    });


  });
});