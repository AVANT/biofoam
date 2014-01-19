require('app');
require('handlebars');
var Masonry = require('masonry');
require('apps/posts/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'posts js-masonry',
    itemView: List.Post,
    onRender: function(){
      this.msnry = new Masonry( this.$el[0], {
        // 'columnWidth': '.post',
        // 'isFitWidth': true,
        'gutter': 20,
        'transitionDuration': 0,
      });
      // //// todo: mansonry loads broken, I think it doesnt have the images loaded at the time of init
      // //// could fix this by using imagesLoaded as suggested on the FAQ page of masonry
      // // imagesLoaded( container, function() {
      // //   msnry.layout();
      // // });
      // this.msnry.on('layoutComplete', function ( msnryInstance, laidOutItems ) {
      //   Moonrakr.trigger('posts:msnry:layoutcomplete', msnryInstance);
      // });
    },
    onShow:function(){
      var that = this;
      // // really shitty fix for this problem
      setTimeout(function(){
        that.msnry.layout();
      }, 150);
    },
    onClose:function () {
      // release msnry element
      // unbind msnry events
    }
  });

});