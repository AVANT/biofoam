require('app');
require('handlebars');
var Masonry = require('masonry');
require('apps/posts/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'post js-masonry',
    itemView: List.Post,
    onShow: function(){
      var masonEl = this.$el.find('.js-masonry')[0];
      var msnry = new Masonry( masonEl );
      // imagesLoaded( container, function() {
      //   msnry.layout();
      // });
    }
  });

});