require('app');
require('handlebars');
var salvattore = require('salvattore');
require('apps/posts/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'posts js-salvattore',
    itemView: List.Post,
    // temp
    count: 0,
    onShow:function(){
      this.$el.attr('data-columns', '');
      salvattore.register_grid( this.$el[0] );
    },

    // use this method to pull out the splash article
    onBeforeItemAdded: function(itemView){
      if (this.count == 0){
        this.count += 1;
        this.trigger('post:splash', itemView.model);

        // destroy html of the itemview meant for the splash position
        itemView.$el.css('display', 'none');
      }
    }

  });

});