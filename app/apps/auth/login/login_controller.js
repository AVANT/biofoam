define(function(require){

  var Moonrakr = require('app');
  require('apps/auth/login/login_views');

  return Moonrakr.module('Auth.Login', function(Login){

    Login.Controller = {
      loginUser: function( route ){
        var view = new Login.LoginView();

        view.on('form:submit', function(data){
          // if server returns good then navigate to the previous route the user was at

          // catch for the case where the user came in on signup or login
          if( route == "signup" || route == "login" ){
            Moonrakr.trigger('posts:list');
          }
          else{
            Moonrakr.navigate( route, {trigger: true} ); // BAD CEDRIC, USING TRIGGER TRUE.  would be best to take the route string, parse it into the correct trigger string, and app.trigger that instead. But since I'm using triggers everywhere else this hack can probably be left. //
          }

          // else display errors from server
          // view.triggerMethod('form:data:invalid', server errors)
        });

        view.on('view:signup', function(){
          Moonrakr.trigger('auth:signup', route);
        });

        Moonrakr.mainRegion.show( view );
      }
    }

  });

});