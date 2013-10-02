define(function(require){

  // VENDOR
  var Handlebars = require('handlebars');
  // APPS
  var Moonrakr = require('app');
  // TEMPLATES
  var _post = require('text!apps/posts/list/templates/post.html'),
  _postsLayout = require('text!apps/posts/list/templates/post-layout.html');
  _postsPanel = require('text!apps/posts/list/templates/post-panel.html');

  return Moonrakr.module('PostsApp.List', function(List){

    // SINGLE POST VIEW
    List.Post = Marionette.ItemView.extend({
      tagName: 'article',
      template: Handlebars.compile(_post),
      events: {
        'click': 'showClicked'
      },
      showClicked: function(e){
        e.preventDefault();
        this.trigger('post:show', this.model);
      }
    })

    // COLLECTION POST VIEW
    List.Posts = Marionette.CollectionView.extend({
      tagName: 'div',
      itemView: List.Post
    })

    // LAYOUT POST VIEW
    List.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _postsLayout ),
      regions: {
        panelRegion: '#panel-region',
        postsRegion: '#posts-region'
      }
    })

    // BUTTON PANEL
    List.Panel = Marionette.ItemView.extend({
      template: Handlebars.compile( _postsPanel ),
      triggers: {
        'click button.js-new': 'post:new'
      }
    })

  });
});