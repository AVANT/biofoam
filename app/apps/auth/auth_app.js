define(function(require){

  var Moonrakr = require('app');
  // require('apps/auth/login/login_controller');
  // require('apps/auth/signup/signup_controller');

  return Moonrakr.module('AuthApp', function(AuthApp){

    // DEFINE ROUTES
    AuthApp.Router = Marionette.AppRouter.extend({
      appRouter : {
        'login': 'loginUser',
        'signup': 'signupUser'
      }
    });

    // DEFINE ROUTES HANDLERS
    var API = {
      loginUser: function(){
        console.log( 'login route called' );
        // AuthApp.Login.Controller.loginUser();
      },
      signupUser: function(){
        console.log( 'signup route called' );
        // AuthApp.Signup.Controller.signupUser();
      },
    };

    // INIT ROUTER WITH MOONRAKR STARTUP
    Moonrakr.addInitializer(function(){
      new AuthApp.Router({
        controller: API
      })
    });

    // OPEN API UP TO ALL SUB APPS (ALSO USED BY THIS APP'S CONTROLLERS)
    Moonrakr.on('auth:login', function(){
      // consider 'function( previousRoute )' so that the app could then route the user back to whatever they were doing before they were prompted to login
      // this may not be necessary if the login is done as modal only
      Moonrakr.navigate('login');
      API.loginUser();
    });

    Moonrakr.on('auth:signup', function(){
      // same consideration as above 'function( previousRoute )' in this case would be used when a user is prompted to signup while trying to make a comment
      Moonrakr.navigate('signup');
      API.signupUser();
    })

  });

});