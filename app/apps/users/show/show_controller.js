define(function(require){

  var Moonrakr = require('app');
  require('apps/users/show/show_view');

  return Moonrakr.module('UsersApp.Show', function(Show){

    Show.Controller = {
      showUser: function(id){

        Moonrakr.Common.Controller.helper.cueLoadingView();

        authGranted = Moonrakr.Common.Controller.helper.getAuthFlag(Show.CMSPanel);

        var cmsPanel = authGranted ? new Show.CMSPanel() : null ;
        var userLayout = new Show.UserLayout();
        var commentsView = Moonrakr.request('comments:listforuser');

        var fetchingUser = Moonrakr.request('user:entity', id);
        $.when(fetchingUser).done(function(user){
          var userView;

          if (user !== undefined){

            userIsOwner = Moonrakr.Common.Controller.helper.getOwnershipFlag(user, "user");
            cmsPanel = cmsPanel || userIsOwner ? new Show.CMSPanel() : null ;

            userView = new Show.User({
              model: user
            });

            if(authGranted || userIsOwner){
              cmsPanel.on('user:edit', function(){
                Moonrakr.trigger('user:edit', user.get('id'));
              });
            }

            userLayout.on('show', function(){
              if(authGranted || userIsOwner){ userLayout.cmsRegion.show(cmsPanel); }
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