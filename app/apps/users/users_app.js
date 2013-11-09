define(function(require){

  var Moonrakr = require('app');
  require('apps/users/new/new_controller');
  require('apps/users/list/list_controller');
  require('apps/users/show/show_controller');
  require('apps/users/edit/edit_controller')

  return Moonrakr.module('UsersApp', function(UsersApp){

    UsersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'users': 'listUsers',
        'users/new': 'newUser',
        'users/:id': 'showUser',
        'users/:id/edit': 'editUser'
      }
    });

    var API = {
      listUsers: function(){
        UsersApp.List.Controller.listUsers();
        Moonrakr.execute('set:active:header', 'users');
        Moonrakr.execute('header:set:title', 'Users');
      },
      newUser: function(){
        UsersApp.New.Controller.newUser();
        Moonrakr.execute('set:active:header', 'users');
        Moonrakr.execute('header:set:title', 'Users: New');
      },
      showUser: function(id){
        UsersApp.Show.Controller.showUser(id);
        Moonrakr.execute('set:active:header', 'users');
      },
      editUser: function(id){
        UsersApp.Edit.Controller.editUser(id);
        Moonrakr.execute('set:active:header', 'users');
      }
    };

    Moonrakr.addInitializer(function(){
      new UsersApp.Router({
        controller: API
      });
    });

    Moonrakr.on('users:list', function(id){
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

}); // define