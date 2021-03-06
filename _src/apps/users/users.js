/**
# Users App

The users app provides all the url routing and event routing to the subapps.

Routes:
- /users
- /users/new
- /users/:id
- /users/:id/edit

@module users
@requires moonrakr, users.new, users.list, users.show, users.edit
**/


require('app');
require('apps/users/new/new_controller');
require('apps/users/list/list_controller');
require('apps/users/show/show_controller');
require('apps/users/edit/edit_controller');

return Moonrakr.module('Users', function(Users){

  Users.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'users': 'listUsers',
      'users/new': 'newUser',
      'users/:id': 'showUser',
      'users/:id/edit': 'editUser'
    }
  });

  var API = {
    listUsers: function(){
      Users.List.Controller.listUsers();
      // Moonrakr.execute('set:active:header', 'users');
      // Moonrakr.execute('header:set:title', 'Users');
    },
    newUser: function(){
      Users.New.Controller.newUser();
      // Moonrakr.execute('set:active:header', 'users');
      // Moonrakr.execute('header:set:title', 'Users: New');
    },
    showUser: function(id){
      Users.Show.Controller.showUser(id);
      // Moonrakr.execute('set:active:header', 'users');
    },
    editUser: function(id){
      Users.Edit.Controller.editUser(id);
      // Moonrakr.execute('set:active:header', 'users');
    }
  };

  Moonrakr.addInitializer(function(){
    new Users.Router({
      controller: API
    });
  });

  Moonrakr.on('users:list', function(){
    Moonrakr.navigate('users');
    API.listUsers();
  });

  Moonrakr.on('user:new', function(){
    Moonrakr.navigate('users/new');
    API.newUser();
  });

  Moonrakr.on('user:show', function(id){
    Moonrakr.navigate('users/' + id);
    API.showUser(id);
  });

  Moonrakr.on('user:edit', function(id){
    Moonrakr.navigate('users/' + id + '/edit');
    API.editUser(id);
  });

}); // return usersApp
