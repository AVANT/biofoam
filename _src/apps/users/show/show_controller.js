/**
# Users.Show Subapp

The users.show subapp contains both the controller and view constructors necessary to display a user's detail page on the web app.

@module users
@submodule users.show
@namespace users.show
@main
**/

/**
# Controller

The users.show.controller creates a user's layout view and displays it in moonrakr.mainRegion

@class controller
@static
@requires moonrakr, users.show.views
**/

require('app');
require('apps/users/show/views/user');
require('apps/users/show/views/missing_user');
require('apps/users/show/views/cms_panel');
require('apps/users/show/views/user_layout');

return Moonrakr.module('Users.Show', function(Show){

  Show.Controller = {
    showUser: function(id){

      Moonrakr.Common.Controller.helper.cueLoadingView();

      var authGranted = Moonrakr.Common.Controller.helper.getAuthFlag(Show.CMSPanel);

      var cmsPanel = authGranted ? new Show.CMSPanel() : null ;
      var userLayout = new Show.UserLayout();
      // var commentsView = Moonrakr.request('comments:listforuser');

      var fetchingUser = Moonrakr.request('user:entity', id);
      $.when(fetchingUser).done(function(user){
        var userView;

        if (user !== undefined){

          var userIsOwner = Moonrakr.Common.Controller.helper.getOwnershipFlag(user, 'user');
          cmsPanel = cmsPanel || userIsOwner ? new Show.CMSPanel() : null ;

          userView = new Show.User({
            model: user
          });

          window.myModel = user;

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
            // userLayout.commentsRegion.show( commentsView );
          });
        }
        else {
          userView = new Show.MissingUser();
        }

        Moonrakr.mainRegion.show( userLayout );
      });
    }
  };

});