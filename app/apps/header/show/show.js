define(function(require){

  var Moonrakr = require("app");
  var _header = require("text!apps/header/show/templates/header.html")

  return Moonrakr.module('Show', function(Show){
    this.startWithParent = true;


    Show.Header = Marionette.ItemView.extend({
      template: _header
    });

    Show.Controller = {
      showHeader: function(){
        // new view with correct template
        // show view
        console.log('got this far');
        var headerView = new Show.Header();
        Moonrakr.mainRegion.show( headerView );
      }
    }

    Show.on("start", function(){
      console.log("show started");
      Show.Controller.showHeader();
    });
  });
});