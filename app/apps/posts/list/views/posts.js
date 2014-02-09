require('app');
require('handlebars');
// var Masonry = require('masonry');
window.salvattore = require('salvattore');
require('apps/posts/list/views/post');

return Moonrakr.module('Posts.List', function(List){

  List.Posts = Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'posts js-salvattore',
    itemView: List.Post,
    onShow:function(){
      this.$el.attr('data-columns', '');
      salvattore.register_grid( this.$el[0] );
    },

    layoutHandler: function(msnryInstance, context){
      context.centerThisInParent( msnryInstance );
    },

    centerThisInParent: function(msnryInstance){
      var wWidth = $(window).width();

      var setPaddingTo;

      // if the window be smallz - using smallest breakpoint 768px
      if ( wWidth <= 768 ){
        setPaddingTo = 0;
      } else {
        var pWidth = this.$el.parent().parent().width(); // #header element
        var mWidth = this.getMasonryWidth(msnryInstance);
        setPaddingTo = parseInt( (pWidth - mWidth) / 2 );
      }

      this.$el.parent().css('padding-left', setPaddingTo);
    },

    getMasonryWidth:function (msnryInstance) {

      var width = 0;

      msnryInstance.items.some(function(e) {
        if ( e.position.y > 0 ) return true;
        var size = e.size;
        width += size.borderLeftWidth + size.borderRightWidth + size.marginLeft  + size.marginRight + size.width + size.paddingLeft + size.paddingRight;
        width += msnryInstance.gutter;
      });

      return width -= msnryInstance.gutter;
    }

  });

});