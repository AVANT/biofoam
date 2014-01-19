require('app');
require('handlebars');
require('bootstrap');
require('apps/menu/show/views/menu_link');
var _menu = require('text!apps/menu/show/templates/menu.html');

return Moonrakr.module('Menu.Show', function(Show){

  Show.Menu = Marionette.CompositeView.extend({
    template: Handlebars.compile( _menu ),
    tagName: 'nav',
    className: 'nav',
    itemView: Show.MenuLink,
    itemViewContainer: '.menu-links',
    events:{
      // 'click .js-menu-toggle': menuClicked
    },
    initialize: function  () {
      Moonrakr.on('posts:msnry:layoutcomplete', this.layoutCompleteHandler, this );
    },
    logoClicked:function(e){
      e.preventDefault();
      this.trigger('logo:clicked');
    },
    onShow:function(){
      var $menu = this.$el.find('#menu');
      $menu.collapse('hide');

      // attach listeners to the bootstrap events from opening and closing menu
      $menu.on('show:bs:collapse', this.menuOpening);
      $menu.on('hide:bs:collapse', this.menuClosing);
    },
    menuOpening:function(){
      // lock body
      $('body').addClass('locked');
    },
    menuClosing: function(){
      // unlock body
      $('body').removeClass('locked');
    },
    layoutCompleteHandler:function (msnryInstance) {
      // do stuff with msnryInstance
      var width = 0;
      msnryInstance.items.some(function(e) {
        if ( e.position.y > 0 ) return true;
        var size = e.size;
        width += size.borderLeftWidth + size.borderRightWidth + size.marginLeft  + size.marginRight + size.width + size.paddingLeft + size.paddingRight;
        width += msnryInstance.gutter;
      });
      width -= msnryInstance.gutter;
      console.log(width);
      this.$el.find('.nav-viewport').css('width', width + "px");
    }

  });

});