define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/list/_common/views');

  return Moonrakr.module('CommentsApp.List.ForUser', function(ForUser){

    ForUser.Comments = Moonrakr.CommentsApp.List.Common.Views.Comments.extend({
      itemView: Moonrakr.CommentsApp.Show.ForUser.Comment,
      buildItemView: function(item, ItemViewType, itemViewOptions){
        // note options are not getting properly attached to the itemview see marionette source for buildItemView
        var view = Moonrakr.request('comment:showforuser', item);
        return view;
      }
    });

  });

});