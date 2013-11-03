define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/list/_common/views');

  return Moonrakr.module('CommentsApp.List.ForPost', function(ForPost){

    ForPost.Comments = Moonrakr.CommentsApp.List.Common.Views.Comments.extend({
      itemView: Moonrakr.CommentsApp.Show.ForPost.Comment,
      buildItemView: function(item, ItemViewType, itemViewOptions){
        // note options are not getting properly attached to the itemview see marionette source for buildItemView
        var view = Moonrakr.request('comment:showforpost', item);
        return view;
      }
    });

    // new comment

    // comment layout

  });

});