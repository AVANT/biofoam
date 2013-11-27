/**
# Users.Show SubApp

The users.show subapp contains both the controller and view constructors necessary to display a user's detail page in the frontend.

@module users
@submodule users.show
@main
**/

/**
# Controller

The users.show.controller creates a user's layout view and displays it in moonrakr.mainRegion

@class controller
@static
@namespace users.show
@requires moonrakr, users.show.views
**/

define(function(require){

  var Moonrakr = require('app');
  require('apps/users/show/show_views');

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

            // set page title
            Moonrakr.execute('header:set:title', 'Users: ' + user.get('username'));

            if(authGranted || userIsOwner){
              cmsPanel.on('user:edit', function(){
                console.log( user.get('id') );
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