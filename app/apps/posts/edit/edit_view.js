define(function(require){
  var Handlebars = require('handlebars');
  require('backbone.syphon');
  var Moonrakr = require('app');
  require('apps/posts/_common/views');

  return Moonrakr.module('PostsApp.Edit', function(Edit){

    Edit.Post = Moonrakr.PostsApp.Common.Views.Form.extend({
      templateHelpers: {
        titleText: 'Edit Post',
        submitText: 'Save Post'
      }
    });

  });

});