define(function(require){
  // VENDOR
  var Handlebars = require('handlebars');
  require('backbone.syphon');
  // APP
  var Moonrakr = require('app');
  // POSTS COMMON VIEWS
  require('apps/posts/_common/views');

  return Moonrakr.module('PostsApp.Edit', function(Edit){

    Edit.Post = Moonrakr.PostsApp.Common.Views.Form.extend();

  }); // return

}); // define