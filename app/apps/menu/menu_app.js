/**
# Menu App

The menu app creates the persistant header layout which includes all the search functionality.

Subapps:
- List

@module Menu
**/

define(function(require){

  var Moonrakr = require("app");
  require('apps/menu/list/list_controller');

  return Moonrakr.module('Menu', function(Menu){
    this.startWithParent = true;

    var API = {
      listHeader: function(){
        Menu.List.Controller.listHeader();
      },
      setHeaderText: function(str){
        Menu.List.Controller.setHeaderText(str);
      }
    };

    Moonrakr.commands.setHandler('set:active:header', function(name){
      Moonrakr.Menu.List.Controller.setActiveHeader(name);
    });

    Menu.on("start", function(){
      API.listHeader();
    });

    Moonrakr.commands.setHandler('header:set:title', function(str){
      API.setHeaderText(str);
    });
    // consider setting up handler with three arguments: 'section', 'action', and 'title'
    // this will allow for more control over styling
    // this may allow the search bar to act more for the power user

  });
});