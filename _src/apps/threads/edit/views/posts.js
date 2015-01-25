require('app');

require('apps/threads/edit/views/post');

return Moonrakr.module('Threads.Edit', function (Edit) {

  Edit.Posts = Marionette.CollectionView.extend({
    tagName: 'section',
    className: 'posts',
    itemView: Edit.Post
  });

});
