define(function(require){

  var Moonrakr = require('app');
  require('apps/users/list/list_views');

  return Moonrakr.module('UsersApp.List', function(List){

    List.Controller = {
      listUsers: function(){

        Moonrakr.Common.Controller.helper.cueLoadingView();

        var authGranted = Moonrakr.Common.Controller.helper.getAuthFlag( List.CMSPanel );

        var fetchingUsers = Moonrakr.request('user:entities');

        var usersListLayout = new List.Layout();
        var usersListPanel = authGranted ? new List.CMSPanel() : null;

        $.when(fetchingUsers).done(function(users){

          var usersListView = new List.Users({
            collection: users
          });

          usersListLayout.on('show', function(){
            if(authGranted){ usersListLayout.panelRegion.show( usersListPanel ); }
            usersListLayout.usersRegion.show( usersListView );
          });

          if(authGranted){
            usersListPanel.on('user:new', function(){
              Moonrakr.trigger('user:new');
            });
          }

          usersListView.on('itemview:user:show', function(childView, model){
            Moonrakr.trigger('user:show', model.get('id'));
          });

          Moonrakr.mainRegion.show( usersListLayout );

        });
      }
    }

  });

});