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
    // hacky
    counter: 0,
    initalize: function(){

    },
    onAfterItemAdded: function(itemView){
      // if (this.counter === 0){
      //   this.counter += 1;
      // } else if (this.counter === 1){
      //   this.counter += 1;
      //   salvattore.register_grid( this.$el );
      // } else {
      //   salvattore['append_elements']( this.$el, [ itemView.$el ]);
      // }
    },
    onRender: function(){
      // this.msnry = new Masonry( this.$el[0], {
      //   // 'columnWidth': '.post',
      //   // 'isFitWidth': true,
      //   'gutter': 20,
      //   'transitionDuration': 0,
      //   'isInitLayout': false,
      // });

      // //// todo: mansonry loads broken, I think it doesnt have the images loaded at the time of init
      // //// could fix this by using imagesLoaded as suggested on the FAQ page of masonry
      // // imagesLoaded( container, function() {
      // //   msnry.layout();
      // // });

      // var that = this;
      // this.msnry.on('layoutComplete', function(msnryInstance){
      //   that.layoutHandler(msnryInstance, that);
      // });
      // console.log('this $el', this.$el );
    },

    onShow:function(){
      // var that = this;
      // // // really shitty fix for this problem
      // setTimeout(function(){
      //   that.msnry.layout();
      //   that.centerThisInParent( that.msnry );
      // }, 200);
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