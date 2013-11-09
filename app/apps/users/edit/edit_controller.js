define(function(require){

  var bootbox = require('bootbox');
  var Moonrakr = require('app');
  require('apps/users/edit/edit_views');

  return Moonrakr.module('UsersApp.Edit', function(Edit){

    Edit.Controller = {
      editUser: function(id){

        Moonrakr.Common.Controller.helper.cueLoadingView();

        // console.log( id );
        var fetchingUser = Moonrakr.request('user:entity', id);
        $.when(fetchingUser).done(function(user){

          var layoutView;
          if(user !== undefined){

            // console.log( user );

            layoutView = new Edit.User({
              model: user
            });

            var imageUploader = new Edit.ImageUploader();

            Moonrakr.execute('header:set:title', 'Users: Edit: ' + user.get('username'));

            layoutView.on('render', function(){
              layoutView.imageUploadRegion.show( imageUploader );
            });

            layoutView.on('form:submit', function(data){
              if(user.save(data)){
                Moonrakr.trigger('user:show', user.get('id'));
              }
              else{
                layoutView.triggerMethod('form:data:invalid', user.validationError);
              }
            });

            layoutView.on('user:delete', function(user){
              user.destroy();
              Moonrakr.trigger('users:list');
            });
          }
          else{
            layoutView = new Moonrakr.UsersApp.Show.MissingPost();
          }

          Moonrakr.mainRegion.show( layoutView );

        });

      }
    }

  });

});