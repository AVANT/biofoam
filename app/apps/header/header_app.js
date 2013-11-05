define(function(require){

  var Moonrakr = require("app");
  require('apps/header/list/list_controller');

  return Moonrakr.module('HeaderApp', function(HeaderApp){
    this.startWithParent = true;

    var API = {
      listHeader: function(){
        HeaderApp.List.Controller.listHeader();
      },
      setHeaderText: function(str){
        HeaderApp.List.Controller.setHeaderText(str);
      }
    };

    Moonrakr.commands.setHandler('set:active:header', function(name){
      Moonrakr.HeaderApp.List.Controller.setActiveHeader(name);
    });

    HeaderApp.on("start", function(){
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