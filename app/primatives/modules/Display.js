define(function(){

  return function(SubApp, App, Backbone, Marionette, $, _){

      //////////////////////
     // SubApp Variables //
    //////////////////////

    SubApp.showRegion = {};


    SubApp.API = {
      show: function(){
        SubApp.Controller.show();
      }
    };

    SubApp.Controller = {
      show: function(){
        var v = new SubApp.ItemView();
        SubApp.showRegion.show( v );
      }
    };


      //////////////////
     // SubApp Views //
    //////////////////

    SubApp.ItemView = Marionette.ItemView.extend({

    });

  };

});
