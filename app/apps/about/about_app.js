define(function(require){

  var Moonrakr = require('app');
  require('apps/about/show/show_controller');

  return Moonrakr.module('AboutApp', function(AboutApp){

    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'about': 'showAbout'
      }
    });

    var API = {
      showAbout: function(){
        AboutApp.Show.Controller.showAbout();
      }
    };

    Moonrakr.on('about:show', function(){
      Moonrakr.navigate('about');
      API.showAbout();
    });

    Moonrakr.addInitializer(function(){
      new AboutApp.Router({
        controller: API
      });
    });

  });

});