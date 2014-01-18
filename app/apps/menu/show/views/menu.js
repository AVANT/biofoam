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
      // catch logo click
    },
    initialize: function  () {
      // i think this works with out using an anon function
      Moonrakr.on('posts:msnry:layoutcomplete', this.layoutCompleteHandler, this );
    },
    logoClicked:function(e){
      e.preventDefault();
      this.trigger('logo:clicked');
    },
    onShow:function(){
      this.$el.find('#menu').collapse('hide');
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