require('app');

var salvattore = require('salvattore');
require('apps/threads/show/views/post');

return Moonrakr.module('Threads.Show', function (Show) {

  Show.Posts = Marionette.CollectionView.extend({
    className: 'posts js-salvattore',
    itemView: Show.Post,
    onShow: function(){
      this.$el.attr('data-columns', '');
      salvattore.register_grid( this.$el[0] );
    },
  });

});
