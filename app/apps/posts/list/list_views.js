define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/_common/views/cms_panel');

  var _post = require('text!apps/posts/list/templates/post.html');
  var _postsLayout = require('text!apps/posts/list/templates/post-layout.html');
  var _postsPanel = require('text!apps/posts/list/templates/post-panel.html');

  return Moonrakr.module('Posts.List', function(List){

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
    });

    // COLLECTION POST VIEW
    List.Posts = Marionette.CollectionView.extend({
      tagName: 'div',
      itemView: List.Post
    });

    // LAYOUT POST VIEW
    List.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _postsLayout ),
      regions: {
        panelRegion: '#panel-region',
        postsRegion: '#posts-region'
      }
    });

    // BUTTON PANEL
    List.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 2, // 2 = authors, editors, and admins
      template: Handlebars.compile( _postsPanel ),
      triggers: {
        'click button.js-new': 'post:new'
      },
      templateHelpers: {
        newPostAction: function(){
          return 'New Post';
          // if(Moonrakr.Posts.New.newPost){
          //   return 'Resume Editing New Post'
          // }
          // else {
          //   return 'New Post'
          // }
        }
      }
    });

  });
});