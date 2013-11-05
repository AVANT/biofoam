define(function(require){

  var Moonrakr = require('app');
  require('apps/auth/login/login_controller');
  require('apps/auth/signup/signup_controller');

  return Moonrakr.module('Auth', function(Auth){

    Auth.Router = Marionette.AppRouter.extend({
      appRoutes : {
        'login': 'loginUser',
        'signup': 'signupUser'
      }
    });

    var API = {
      loginUser: function( route ){
        Auth.Login.Controller.loginUser( route );
      },
      signupUser: function( route ){
        console.log( 'signup route called' );
        Auth.Signup.Controller.signupUser( route );
      },
    };

    /***************************/
    // setup dummy current user
    Auth.currentUser = new Moonrakr.Entities.User({
      id: 1,  // cedric
      username: "Ced",
      userPermissions: 999 // 0=everyone, 1=publicUser, 2=author, 3=editor, 4+=admin
    });
    /***************************/

    // INIT ROUTER WITH MOONRAKR STARTUP
    Moonrakr.addInitializer(function(){
      new Auth.Router({
        controller: API
      })
    });

    Moonrakr.on('auth:login', function( route ){
      // consider 'function( previousRoute )' so that the app could then route the user back to whatever they were doing before they were prompted to login
      // this may not be necessary if the login is done as modal only
      Moonrakr.navigate('login');
      API.loginUser( route );
    });

    Moonrakr.on('auth:signup', function( route ){
      // same consideration as above 'function( previousRoute )' in this case would be used when a user is prompted to signup while trying to make a comment
      Moonrakr.navigate('signup');
      API.signupUser( route );
    })

    Moonrakr.reqres.setHandler('auth:userpermissions', function(){
      return Auth.currentUser.get('userPermissions');
    });

    Moonrakr.reqres.setHandler('auth:id', function(){
      return Auth.currentUser.get('id');
    });

  });

});