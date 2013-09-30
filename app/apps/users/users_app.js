define(function(require){

  var Moonrakr = require('app');

  return Moonrakr.module('UsersApp', function(UsersApp){

    UsersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'login': 'loginUser',
        'users/new': 'newUser'
        'users': 'listUsers',
      }
    });

    var API = {
      loginUser: function(){
        console.log('login user route fired');
        // UsersApp.Login.Controller.loginUser();
      },
      newUser: function(){
        console.log('new user route fired');
        UsersApp.New.Controller.newUser();
      },
      listUsers: function(){
        console.log('list users route fired');
        // UsersApp.List.Controller.listUsers();
      }
    }

    Moonrakr.addInitializer(function(){
      new UsersApp.Router({
        controller: API
      });
    });

    Moonrakr.UsersApp.on('users:new', function(){
      Moonrakr.navigate('users/new');
      API.newUser();
    });

  }); // return usersApp

}); // define