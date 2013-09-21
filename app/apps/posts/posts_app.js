define(function(require){

  var Moonrakr = require("app");
  var hmm = require('apps/posts/list/list_controller');
  var hmm2 = require('apps/posts/show/show_controller');

  return Moonrakr.module("PostsApp",function(PostsApp){

    PostsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "posts": "listPosts"
      }
    });

    var API = {
      listPosts: function(){
        PostsApp.List.Controller.listPosts();
      }
    };

    Moonrakr.addInitializer(function(){
      new PostsApp.Router({
        controller: API
      });
    });

    Moonrakr.on('posts:list', function(){
      Moonrakr.navigate('posts');
      API.listPosts();
    });

  }); // return the module

}); // define