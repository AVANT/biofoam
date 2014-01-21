require('app');
require('apps/menu/show/show_controller');

return Moonrakr.module('Menu', function(Menu){
  this.startWithParent = true;

  var API = {
    showMenu: function(){
      Menu.Show.Controller.showMenu();
    },
    setHeaderText: function(str){
      Menu.Show.Controller.setHeaderText(str);
    }
  };


  Menu.on('start', function(){
    API.showMenu();
  });



  Moonrakr.commands.setHandler('set:active:header', function(name){
    Moonrakr.Menu.Show.Controller.setActiveHeader(name);
  });

  Moonrakr.commands.setHandler('header:set:title', function(str){
    // API.setHeaderText(str);
  });

});