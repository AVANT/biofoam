/**
@module users
@submodule users.edit
@namespace users.edit
**/

define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/_common/views/image_uploader');
  require('apps/users/_common/views');

  return Moonrakr.module('UsersApp.Edit', function(Edit){

    /**
    @class User
    @constructor
    **/
    Edit.User = Moonrakr.UsersApp.Common.Views.Form.extend({
      templateHelpers: {
        submitText: 'Save User',
        titleText: 'Edit User'
      }
    });

    /**
    @class ImageUploader
    @constructor
    **/
    Edit.ImageUploader = Moonrakr.Common.Views.ImageUpload.extend();

  });

});