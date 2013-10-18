define(function(require){

  var Moonrakr = require('app');
  require('apps/users/show/show_view');

  return Moonrakr.module('UsersApp.Show', function(Show){

    Show.Controller = {
      showUser: function(id){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingUser = Moonrakr.request('user:entity', id);
        $.when(fetchingUser).done(function(user){
          var userView;

          if (user !== undefined){

            userView = new Show.User({
              model: user
            });

            userView.on('user:edit', function(user){
              Moonrakr.trigger('user:edit', user.get('id'));
            });
          }
          else {
            userView = new Show.MissingUser();
          }

          Moonrakr.mainRegion.show( userView );
        });
      }
    }

  });

});