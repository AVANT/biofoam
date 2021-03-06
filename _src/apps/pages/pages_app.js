/**
# Pages App

The posts app provides all the url routing and event routing to the subapps.

Routes:
- /pages/:id
- /pages/:id/edit

Subapps:
- Edit
- Show

@module Pages
**/

require('app');
require('apps/pages/show/show_controller');
require('apps/pages/edit/edit_controller');

return Moonrakr.module('Pages', function(Pages){

  Pages.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'pages/:id': 'showPage',
      'pages/:id/edit': 'editPage'
    }
  });

  var API = {
    showPage: function(id){
      console.log('come back to test passing in just :id to router');
      Pages.Show.Controller.showPage(id);
      Moonrakr.execute('header:set:title', id);
    },
    editPage: function(id){
      Pages.Edit.Controller.editPage(id);
      // Moonrakr.execute('header:set:title', 'About: Edit');
    }
  };

  Moonrakr.addInitializer(function(){
    new Pages.Router({
      controller: API
    });
  });

  Moonrakr.on('pages:show', function(id){
    Moonrakr.navigate('pages/' + id);
    API.showPage(id);
  });

  Moonrakr.on('pages:edit', function(id){
    Moonrakr.navigate('pages/' + id + '/edit');
    API.editPage(id);
  });

});