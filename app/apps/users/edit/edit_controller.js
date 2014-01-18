/**
# Users.Edit SubApp

The users.edit subapp contains both the controller and view constructors necessary to display a user's edit page and handle the CMS events.

@module users
@submodule users.edit
@namespace users.edit
@main
**/

/**
# Controller

The users.edit.controller creates a user's edit view and displays it in moonrakr.mainRegion

@class controller
@static
@requires moonrakr, users.edit.views, bootbox
**/

// var bootbox = require('bootbox');
require('app');
require('apps/users/edit/edit_views');

return Moonrakr.module('Users.Edit', function(Edit){

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

          var imageUploader = Moonrakr.request('media:new');
          imageUploader.trigger('display', user.get('userImageUrl'));

          Moonrakr.execute('header:set:title', 'Users: Edit: ' + user.get('username'));

          layoutView.on('render', function(){
            layoutView.imageUploadRegion.show( imageUploader );
          });

          imageUploader.on('media:save:success', function(data){
            user.set('userImage', {'id': data.id});
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