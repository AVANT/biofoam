require('app');

require('apps/threads/show/show_controller');
require('apps/threads/edit/edit_controller');

return Moonrakr.module('Threads', function (Threads) {

  Threads.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'threads/:id': 'showThread',
      'threads/:id/edit': 'editThread'
    }
  });

  var API = {
    showThread: function (id) {
      Threads.Show.Controller.showThread(id);
    },
    editThread: function (id) {
      Threads.Edit.Controller.editThread(id);
    }
  };

  Moonrakr.on('threads:show', function (id) {
    Moonrakr.navigate( 'threads/' + id );
    API.showThread(id);
  });

  Moonrakr.on('threads:edit', function (id) {
    Moonrakr.navigate( 'threads/' + id + '/edit' );
    API.editThread(id);
  });

  Moonrakr.addInitializer(function(){
    new Threads.Router({
      controller: API
    });
  });

});
