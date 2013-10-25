define(function(require){

  require('backbone.stickit');
  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/comments/_common/views');
  var _commentsLayout = require('text!apps/comments/list/templates/comments_layout.html');
  var _commentsContainer = require('text!apps/comments/list/templates/comments_container.html');
  var _newComment = require('text!apps/comments/list/templates/comment_new.html');

  return Moonrakr.module('CommentsApp.List', function(List){

  List.Comments = Marionette.CollectionView.extend({
      tagName: 'div',
      template: Handlebars.compile( _commentsContainer ),
      itemView: Moonrakr.CommentsApp.Common.Views.Comment.extend(),
      // overwriting the default 'buildItemView' method for a CollectionView
      buildItemView: function(item, ItemViewType, itemViewOptions){
        var options = _.extend({model: item}, itemViewOptions);
        return Moonrakr.request('comment:show:return', item.get('id'));
        // return new ItemViewType(options);
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
      }
    });

  });

});