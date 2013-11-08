define(function(require){

  var Moonrakr = require('app');
  require('apps/_common/views/imageUploader');
  require('apps/users/new/new_view');

  return Moonrakr.module('UsersApp.New', function(New){

    New.Controller = {
      newUser: function(){

          /////////////////////////////
         // GET VIEWS AND THE MODEL //
        /////////////////////////////

        var newUser = new Moonrakr.Entities.User();

        var layoutView = new New.User({
          model: newUser
        });

        var imageUploadView = new Moonrakr.Common.Views.ImageUpload();

        layoutView.on('render', function(){
          layoutView.imageUploadRegion.show( imageUploadView );
        });

        // SAVE HANDLER //
        layoutView.on('form:submit', function(){
          // GET HIGHEST ID OF ALL POSTS -- not needed with live server
          var fetchingUsers = Moonrakr.request('user:entities');
          $.when(fetchingUsers).done(function(users){
            var highestId = users.max(function(c){ return c.id });
            highestId = highestId.get('id');
            id = highestId + 1;
            if(newUser.save({'id': id})){
              Moonrakr.trigger('user:show', newUser.get('id'));
            }
            else {
              layoutView.triggerMethod('form:data:invalid', newUser.validationError);
            }
          });
        });

        Moonrakr.mainRegion.show( layoutView );
      }
    }

  });

});