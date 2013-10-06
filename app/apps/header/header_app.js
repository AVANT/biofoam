define(function(require){

  var Moonrakr = require("app");
  require('apps/header/list/list_controller');

  return Moonrakr.module('HeaderApp', function(HeaderApp){
    this.startWithParent = true;

    var API = {
      listHeader: function(){
        HeaderApp.List.Controller.listHeader();
      }
    };

    Moonrakr.commands.setHandler('set:active:header', function(name){
      Moonrakr.HeaderApp.List.Controller.setActiveHeader(name);
    });

    HeaderApp.on("start", function(){
      API.listHeader();
    });
  });
});