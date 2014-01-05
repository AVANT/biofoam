require('app');
require('apps/comments/list/_common/views');

return Moonrakr.module('Comments.List.ForUser', function(ForUser){

  ForUser.Comments = Moonrakr.Comments.List.Common.Views.Comments.extend({
    itemView: Moonrakr.Comments.Show.ForUser.Comment,
    buildItemView: function(item, ItemViewType, itemViewOptions){
      // note options are not getting properly attached to the itemview see marionette source for buildItemView
      var view = Moonrakr.request('comment:showforuser', item);
      return view;
    }
  });

});