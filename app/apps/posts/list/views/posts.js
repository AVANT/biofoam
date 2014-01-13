require('app');
require('handlebars');
var Masonry = require('masonry');
require('apps/posts/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'posts js-masonry',
    itemView: List.Post,
    onShow: function(){
      var masonEl = this.$el.find('.js-masonry')[0];
      var msnry = new Masonry( masonEl );
      //// todo: mansonry loads broken, I think it doesnt have the images loaded at the time of init
      //// could fix this by using imagesLoaded as suggested on the FAQ page of masonry
      // imagesLoaded( container, function() {
      //   msnry.layout();
      // });
    }
  });

});