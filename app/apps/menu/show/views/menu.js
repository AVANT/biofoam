require('app');
require('handlebars');
require('apps/menu/show/views/menu_link');
var _menu = require('text!apps/menu/show/views/templates/menu.html');

return Moonrakr.module('Menu.Show', function(Show){

  Show.Menu = Marionette.CompositeView.extend({
    template: Handlebars.compile( _menu ),
    className: 'nav',
    tagName: 'nav',
    itemView: Show.MenuLink,
    // itemViewContainer: '.menu-viewport',
    events:{
      // catch logo click
    },
    logoClicked:function(e){
      e.preventDefault();
      this.trigger('logo:clicked');
    },
  });

});