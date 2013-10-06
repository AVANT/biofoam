define(function(require){

  var Moonrakr = require('app');
  require('apps/users/list/list_view');

  return Moonrakr.module('UsersApp.List', function(List){

    List.Controller = {
      listUsers: function(){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show(loadingView);

        var fetchingUsers = Moonrakr.request('user:entities');

        var usersListLayout = new List.Layout();
        var usersListPanel = new List.Panel();

        $.when(fetchingUsers).done(function(users){

          var usersListView = new List.Users({
            collection: users
          });

          usersListLayout.on('show', function(){
            usersListLayout.panelRegion.show( usersListPanel );
            usersListLayout.usersRegion.show( usersListView );
          });

          usersListPanel.on('user:new', function(){
            Moonrakr.trigger('user:new');
          });

          usersListView.on('itemview:user:show', function(childView, model){
            Moonrakr.trigger('user:show', model.get('id'));
          });

          Moonrakr.mainRegion.show( usersListLayout );

        });
      }
    }

  });

});