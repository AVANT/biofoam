define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/_common/views');

  return Moonrakr.module('PostsApp.New', function(New){
    New.Post = Moonrakr.PostsApp.Common.Views.Form.extend({
      confirmDelete: 'Are you sure you want to cancel creating this post?',
      templateHelpers: {
        titleText: 'New Post',
        submitText: 'Create Post'
      },
      events: {
        'change input': 'inputChanged'
      },
      inputChanged: function(){
        console.log('input change fired on view');
        this.trigger('input:changed');
      }
    });
  });

});