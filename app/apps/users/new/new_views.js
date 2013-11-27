/**
@module users
@submodule users.new
@main
**/
define(function(require){

  var Moonrakr = require('app');
  require('apps/_common/views/image_uploader');
  require('apps/users/_common/views');


  return Moonrakr.module('UsersApp.New', function(New){

    /**
    @class User
    @constructor
    @namespace users.new
    **/
    New.User = Moonrakr.UsersApp.Common.Views.Form.extend({
      templateHelpers: {
        submitText: 'Create User',
        titleText: 'New User'
      }
    });

    /**
    @class ImageUploader
    @constructor
    @namespace users.new
    **/
    New.ImageUploader = Moonrakr.Common.Views.ImageUpload.extend();

  });

});