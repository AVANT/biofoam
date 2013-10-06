define(function(require){

  var Moonrakr = require('app');
  require('apps/users/edit/edit_view');

  return Moonrakr.module('UsersApp.Edit', function(Edit){

    Edit.Controller = {
      editUser: function(id){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingUser = Moonrakr.request('user:entity', id);
        $.when(fetchingUser).done(function(user){

          var view;
          if(user !== undefined){
            view = new Edit.User({
              model: user
            });

            view.on('form:submit', function(data){
              if(user.save(data)){
                Moonrakr.trigger('user:show', user.get('id'));
              }
              else{
                view.triggerMethod('form:data:invalid', user.validationError);
              }
            });

            view.on('user:delete', function(user){
              user.destroy();
              Moonrakr.trigger('users:list');
            });
          }
          else{
            view = new Moonrakr.UsersApp.Show.MissingPost();
          }

          Moonrakr.mainRegion.show( view );

        });

      }
    }

  });

});