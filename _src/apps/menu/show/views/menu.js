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
    itemViewContainer: '.menu',
    events:{
      'click .nav-logo': 'logoClicked',
    },
    logoClicked:function(e){
      e.preventDefault();
      this.trigger('logo:clicked');
    },
  });

});