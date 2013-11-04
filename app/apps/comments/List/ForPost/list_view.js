define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/list/_common/views');
  var _newComment = require('text!apps/comments/list/forpost/templates/comment_new.html');
  var _commentsLayout = require('text!apps/comments/list/forpost/templates/comment_layout.html');

  return Moonrakr.module('Comments.List.ForPost', function(ForPost){

    ForPost.Comments = Moonrakr.Comments.List.Common.Views.Comments.extend({
      itemView: Moonrakr.Comments.Show.ForPost.Comment,
      buildItemView: function(item, ItemViewType, itemViewOptions){
        // note options are not getting properly attached to the itemview see marionette source for buildItemView
        var view = Moonrakr.request('comment:showforpost', item);
        return view;
      }
    });

    // new comment
    ForPost.NewComment = Marionette.ItemView.extend({
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

    // comment layout
    ForPost.CommentsLayout = Marionette.Layout.extend({
      template: Handlebars.compile( _commentsLayout ),
      regions: {
        newCommentRegion: '#new-comment-region',
        commentsRegion: '#comments-region'
      }
    });

  });

});