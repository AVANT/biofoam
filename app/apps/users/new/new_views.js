/**
@module users
@submodule users.new
@namespace users.new
@main
**/

require('app');
require('apps/_common/views/image_uploader');
require('apps/users/_common/views');


return Moonrakr.module('Users.New', function(New){

  /**
  @class User
  @constructor
  **/
  New.User = Moonrakr.Users.Common.Views.Form.extend({
    templateHelpers: {
      submitText: 'Create User',
      titleText: 'New User'
    }
  });

  /**
  @class ImageUploader
  @constructor
  **/
  New.ImageUploader = Moonrakr.Common.Views.ImageUpload.extend();

});