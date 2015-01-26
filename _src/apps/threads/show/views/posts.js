require('app');

require('apps/threads/show/views/post');

return Moonrakr.module('Threads.Show', function (Show) {

  Show.Posts = Marionette.CollectionView.extend({
    tagName: 'section',
    className: 'posts',
    itemView: Show.Post
  });

});
