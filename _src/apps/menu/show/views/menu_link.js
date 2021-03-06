require('app');
require('handlebars');
var _menuLink = require('text!apps/menu/show/templates/menu_link.html');

function createMenuLinkView(App){

  App.MenuLink = Marionette.ItemView.extend({

    template: Handlebars.compile( _menuLink ),
    tagName: 'span',
    className: function(){
      return 'card button ' + this.model.get('name').toLowerCase();
    },
    events:{
      'click a': 'navigate'
    },
    navigate: function(e){
      e.preventDefault();
      this.trigger('navigate', this.model);
    }
  });

}

return Moonrakr.module('Menu.Show', createMenuLinkView);