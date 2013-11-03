define(function(require){

  // require('backbone.stickit');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/show/_common/views');
  var _commentsLayout = require('text!apps/comments/list/templates/comments_layout.html');
  var _commentsContainer = require('text!apps/comments/list/templates/comments_container.html');
  var _newComment = require('text!apps/comments/list/templates/comment_new.html');

  return Moonrakr.module('CommentsApp.List', function(List){

  // List.Comment = Moonrakr.CommentsApp.Common.Views.Comment.extend();

    List.Comments = Marionette.CompositeView.extend({
      tagName: 'div',
      template: Handlebars.compile( _commentsContainer ),
      itemViewContainer: 'ul',
      itemView: Moonrakr.CommentsApp.Show.Common.Views.Comment,
      buildItemView: function(item, ItemViewType, itemViewOptions){
        console.log('here4');
        var view = Moonrakr.request('comment:show', item);
        console.log( view );
        return view;
      }
    });

    List.NewComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _newComment ),
      bindings: {
        '#comment-body': 'body'
      },
      events: {
        'click .js-submit': 'submitClicked'
      },
      onRender: function(){
        this.stickit();
      },
      submitClicked: function(e){
        e.preventDefault();
        this.trigger('comment:submit');
      }

    });

    List.CommentsLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _commentsLayout ),
      regions: {
        newCommentRegion: '#new-comment-region',
        commentsRegion: '#comments-region'
      },
      onRender: function(){
        console.log('I rendered.');
      }
    });

  });

});