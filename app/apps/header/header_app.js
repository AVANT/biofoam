define(function(require){

  var Moonrakr = require("app");
  var _header = require("text!apps/header/templates/_header.html")

  return Moonrakr.module('HeaderApp', function(HeaderApp){
    this.startWithParent = true;


    HeaderApp.Header = Marionette.ItemView.extend({
      template: _header
    });

    HeaderApp.Controller = {
      showHeader: function(){
        // new view with correct template
        // show view
        console.log('got this far');
        var headerView = new HeaderApp.Header();
        Moonrakr.mainRegion.show( headerView );
      }
    }

    HeaderApp.on("start", function(){
      console.log("Header started");
      HeaderApp.Controller.showHeader();
    });
  });
});