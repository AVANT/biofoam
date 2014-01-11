require('app');
require('handlebars');

require('apps/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    itemView: List.Post
  });

});