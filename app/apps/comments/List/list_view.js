define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/_common/views');

  return Moonrakr.module('CommentsApp.List', function(List){

    List.Post = Moonrakr.CommentsApp.Views.Comment.extend({

    });

    List.Comments = Marionette.CollectionView.extend({
      tagName: 'div',
      itemView: List.Post
    });

  });

});