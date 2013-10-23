define(function(require){

  require('backbone.stickit');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/_common/views');
  var _commentsLayout = require('text!apps/comments/list/templates/comments_layout.html');
  var _newComment = require('text!apps/comments/list/templates/comment_new.html');

  return Moonrakr.module('CommentsApp.List', function(List){

    List.Comment = Moonrakr.CommentsApp.Common.Views.Comment.extend();
    List.User = Moonrakr.CommentsApp.Common.Views.CommentUser.extend();

    List.Comments = Marionette.CollectionView.extend({
      tagName: 'div',
      className: 'testCollectionView',
      itemView: List.Comment
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
      }
    });

  });

});