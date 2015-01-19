require('app');
require('apps/_common/views/image_uploader');
require('apps/posts/_common/views');

return Moonrakr.module('Posts.New', function(New){

  New.Post = Moonrakr.Posts.Common.Views.Form.extend({
    templateHelpers: {
      titleText: 'New Post',
      submitText: 'Create Post'
    }
  });

  New.ImageUpload = Moonrakr.Common.Views.ImageUpload.extend();

});