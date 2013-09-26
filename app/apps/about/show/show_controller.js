define(function(require){

  var Moonrakr = require('app');
  require('apps/about/show/show_view');

  return Moonrakr.module('AboutApp.Show', function(Show){

    Show.Controller = {
      showAbout: function(){
        var view = new Show.Message();
        Moonrakr.secondRegion.show( view );
      }
    }

  });

});