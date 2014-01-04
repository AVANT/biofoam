define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/_common/views');

  return Moonrakr.module('Posts.Edit', function(Edit){

    Edit.Post = Moonrakr.Posts.Common.Views.Form.extend({
      templateHelpers: {
        titleText: 'Edit Post',
        submitText: 'Save Post'
      }
    });

    Edit.ImageUpload = Moonrakr.Common.Views.ImageUpload.extend();

  });

});