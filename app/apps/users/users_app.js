define(function(require){

  var Moonrakr = require('app');
  require('apps/users/new/new_controller');

  return Moonrakr.module('UsersApp', function(UsersApp){

    UsersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'login': 'loginUser',
        'users/new': 'newUser',
        'users': 'listUsers',
        'users/:id': 'showUser'
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
      },
      showUser: function(){
        console.log('show user route fired');
        // UsersApp.Show.Controller.showUser();
      }
    }

    Moonrakr.addInitializer(function(){
      new UsersApp.Router({
        controller: API
      });
    });

    Moonrakr.on('user:new', function(){
      Moonrakr.navigate('users/new');
      API.newUser();
    });

    Moonrakr.on('user:show', function(id){
      Moonrakr.navigate('users/' + id);
      API.showUser();
    });

  }); // return usersApp

}); // define