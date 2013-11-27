/**
# Users.New SubApp

The users.new subapp contains both the controller and view constructors necessary to display a user's detail page in the frontend.

@module users
@submodule users.new
@main
**/

/**
# Controller

The users.new.controller creates a user's layout view and displays it in moonrakr.mainRegion

@class controller
@static
@namespace users.new
@requires moonrakr, users.new.views
**/

define(function(require){

  var Moonrakr = require('app');
  require('apps/users/new/new_views');

  return Moonrakr.module('UsersApp.New', function(New){

    New.Controller = {
      newUser: function(){

        var newUser = new Moonrakr.Entities.User();

        var layoutView = new New.User({
          model: newUser
        });

        var imageUploadView = new New.ImageUploader();

        layoutView.on('render', function(){
          layoutView.imageUploadRegion.show( imageUploadView );
        });

        // SAVE HANDLER //
        layoutView.on('form:submit', function(){

          var data = { 'id': Moonrakr.Entities.HelperFunctions.randomString(32) }; // not needed with live server

          newUser.save(data, {
            success: function(){
              console.log('new user save succesful');
              Moonrakr.trigger('user:show', newUser.get('id'));
            },
            error: function(){
              console.log('new user save failed');
              layoutView.triggerMethod('form:data:invalid', newUser.validationError);
              // TODO handle save error
            }
          });

        });

        Moonrakr.mainRegion.show( layoutView );
      }
    }

  });

});