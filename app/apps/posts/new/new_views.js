define(function(require){

  var Moonrakr = require('app');
  require('apps/_common/views/image_uploader');
  require('apps/posts/_common/views');

  return Moonrakr.module('PostsApp.New', function(New){

    New.Post = Moonrakr.PostsApp.Common.Views.Form.extend({
      templateHelpers: {
        titleText: 'New Post',
        submitText: 'Create Post'
      }
    });

    New.ImageUpload = Moonrakr.Common.Views.ImageUpload.extend();

  });

});