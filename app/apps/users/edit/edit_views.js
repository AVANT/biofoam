define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  require('apps/_common/views/image_uploader');
  require('apps/users/_common/views');

  return Moonrakr.module('UsersApp.Edit', function(Edit){

    Edit.User = Moonrakr.UsersApp.Common.Views.Form.extend({
      templateHelpers: {
        submitText: 'Save User',
        titleText: 'Edit User'
      }
    });

    Edit.ImageUploader = Moonrakr.Common.Views.ImageUpload.extend();

  });

});