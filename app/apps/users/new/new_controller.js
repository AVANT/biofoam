define(function(require){

  var Moonrakr = require('app');
  require('apps/_common/views/image_uploader');
  require('apps/users/new/new_view');

  return Moonrakr.module('UsersApp.New', function(New){

    New.Controller = {
      newUser: function(){

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

            var id = Moonrakr.Entities.HelperFunctions.randomString(32); // not needed with live server
            if(newUser.save({'id': id})){
              Moonrakr.trigger('user:show', newUser.get('id'));
            }
            else {
              layoutView.triggerMethod('form:data:invalid', newUser.validationError);
            }

        });

        Moonrakr.mainRegion.show( layoutView );
      }
    }

  });

});