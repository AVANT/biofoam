require('app');
require('handlebars');
var salvattore = require('salvattore');
require('apps/posts/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'posts js-salvattore',
    itemView: List.Post,
    onShow:function(){
      this.$el.attr('data-columns', '');
      salvattore.register_grid( this.$el[0] );
    }

  });

});