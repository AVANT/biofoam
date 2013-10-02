define(function(require){

  var Moonrakr = require('app');
  require('apps/users/list/list_view');

  return Moonrakr.module('UsersApp.List', function(List){

    List.Controller = {
      listUsers: function(){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show(loadingView);

        var fetchingUsers = Moonrakr.request('user:entities');

        $.when(fetchingUsers).done(function(users){

          var usersListView = new List.Users({
            collection: users
          });

          usersListView.on('itemview:post:show', function(childView, model){
            Moonrakr.trigger('post:show', model.get('id'));
          });

          Moonrakr.mainRegion.show( usersListView );

        });
      }
    }

  });

});