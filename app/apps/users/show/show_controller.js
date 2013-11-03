define(function(require){

  var Moonrakr = require('app');
  require('apps/users/show/show_view');

  return Moonrakr.module('UsersApp.Show', function(Show){

    Show.Controller = {
      showUser: function(id){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var userLayout = new Show.UserLayout();
        var commentsView = Moonrakr.request('comments:listforuser');

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

            userLayout.on('show', function(){
              userLayout.userRegion.show( userView );
              userLayout.commentsRegion.show( commentsView );
            })
          }
          else {
            userView = new Show.MissingUser();
          }

          Moonrakr.mainRegion.show( userLayout );
        });
      }
    }

  });

});