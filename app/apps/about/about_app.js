define(function(require){

  var Moonrakr = require('app');
  require('apps/about/show/show_controller');
  require('apps/about/edit/edit_controller');

  return Moonrakr.module('AboutApp', function(AboutApp){

    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'about': 'showAbout',
        'about/edit': 'editAbout'
      }
    });

    var API = {
      showAbout: function(){
        AboutApp.Show.Controller.showAbout();
        Moonrakr.execute('set:active:header', 'about');
        Moonrakr.execute('header:set:title', 'About');
      },
      editAbout: function(){
        AboutApp.Edit.Controller.editAbout();
        Moonrakr.execute('set:active:header', 'about');
        Moonrakr.execute('header:set:title', 'About: Edit');
      }
    };

    Moonrakr.addInitializer(function(){
      new AboutApp.Router({
        controller: API
      });
    });

    Moonrakr.on('about:show', function(){
      Moonrakr.navigate('about');
      API.showAbout();
    });

    Moonrakr.on('about:edit', function(){
      Moonrakr.navigate('about/edit');
      API.editAbout();
    });

  });

});