define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/_common/views');

  return Moonrakr.module('PostsApp.New', function(New){
    New.Post = Moonrakr.PostsApp.Common.Views.Form.extend({
      onRender: function(){
        this.$('.js-submit').text('Create Post');
        this.$('.js-destroy').text('Cancel');
      }
    });
  });

});