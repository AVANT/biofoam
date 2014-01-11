/**
@module posts
@submodule posts.show
@namespace posts.show
@requires handlebars
**/

require('handlebars');
require('app');
require('apps/_common/views/cms_panel');

var _missingPost = require('text!apps/posts/show/templates/missing_post.html');
var _post = require('text!apps/posts/show/templates/post.html');
var _cms_panel = require('text!apps/posts/show/templates/cms_panel.html');
var _postLayout = require('text!apps/posts/show/templates/post_layout.html');

return Moonrakr.module('Posts.Show', function(Show){

  /**
  @class MissingPost
  @constructor
  @requires missing_post.html
  @extends common.views.itemview
  **/
  Show.MissingPost = Marionette.ItemView.extend({
    tagName: 'article',
    template: Handlebars.compile(_missingPost)
  });

  /**
  @class Post
  @constructor
  **/
  Show.Post = Marionette.ItemView.extend({
    tagName: 'article',
    template: Handlebars.compile(_post),
    initialize: function(){
      this.model.on('change', this.render, this);
    }
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