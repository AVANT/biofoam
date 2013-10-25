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
        'users/:_id': 'showUser',
        'users/:_id/edit': 'editUser'
      }
    });

    var API = {
      listUsers: function(){
        UsersApp.List.Controller.listUsers();
        Moonrakr.execute('set:active:header', 'users');
      },
      newUser: function(){
        UsersApp.New.Controller.newUser();
        Moonrakr.execute('set:active:header', 'users');
      },
      showUser: function(_id){
        UsersApp.Show.Controller.showUser(_id);
        Moonrakr.execute('set:active:header', 'users');
      },
      editUser: function(_id){
        UsersApp.Edit.Controller.editUser(_id);
        Moonrakr.execute('set:active:header', 'users');
      }
    };

    Moonrakr.addInitializer(function(){
      new UsersApp.Router({
        controller: API
      });
    });

    Moonrakr.on('users:list', function(_id){
      Moonrakr.navigate('users');
      API.listUsers();
    });

    Moonrakr.on('user:new', function(){
      Moonrakr.navigate('users/new');
      API.newUser();
    });

    Moonrakr.on('user:show', function(_id){
      Moonrakr.navigate('users/' + _id);
      API.showUser(_id);
    });

    Moonrakr.on('user:edit', function(_id){
      Moonrakr.navigate('users/' + _id + '/edit');
      API.editUser();
    });

  }); // return usersApp

}); // define