define(function(require){

  var Moonrakr = require('app');
  require('apps/users/new/new_controller');
  require('apps/users/list/list_controller');

  return Moonrakr.module('UsersApp', function(UsersApp){

    UsersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'login': 'loginUser',
        'users/new': 'newUser',
        'users': 'listUsers',
        'users/:id': 'showUser',
        'users/:id/edit': 'editUser'
      }
    });

    var API = {
      loginUser: function(){
        // UsersApp.Login.Controller.loginUser();
        Moonrakr.execute('set:active:header', 'users');
      },
      newUser: function(){
        UsersApp.New.Controller.newUser();
        Moonrakr.execute('set:active:header', 'users');
      },
      listUsers: function(){
        UsersApp.List.Controller.listUsers();
        Moonrakr.execute('set:active:header', 'users');
      },
      showUser: function(){
        console.log('show user route fired');
        // UsersApp.Show.Controller.showUser();
        Moonrakr.execute('set:active:header', 'users');
      },
      editUser: function(){
        console.log('edit user route fired');
        // UsersApp.Edit.Controller.editUser();
        Moonrakr.execute('set:active:header', 'users');
      }
    }

    Moonrakr.addInitializer(function(){
      new UsersApp.Router({
        controller: API
      });
    });

    Moonrakr.on('user:login', function(){
      Moonrakr.navigate('login');
      API.loginUser();
    });

    Moonrakr.on('user:new', function(){
      Moonrakr.navigate('users/new');
      API.newUser();
    });

    Moonrakr.on('users:list', function(id){
      Moonrakr.navigate('users');
      API.listUsers();
    });

    Moonrakr.on('user:show', function(id){
      Moonrakr.navigate('users/' + id);
      API.showUser();
    });

    Moonrakr.on('user:edit', function(id){
      Moonrakr.navigate('users/' + id + '/edit');
      API.editUser();
    });

  }); // return usersApp

}); // define