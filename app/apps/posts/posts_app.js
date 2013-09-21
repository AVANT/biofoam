define(function(require){

  var Moonrakr = require("app");
  var hmm = require('apps/posts/list/list_controller');
  var hmm2 = require('apps/posts/show/show_controller');

  return Moonrakr.module("PostsApp",function(PostsApp){

    PostsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "posts": "listPosts",
        "posts/:id": "showPost"
      }
    });

    var API = {
      listPosts: function(){
        PostsApp.List.Controller.listPosts();
      },
      showPost: function(id){
        PostsApp.Show.Controller.showPost(id);
      }
    };

    Moonrakr.PostsApp.on('posts:list', function(){
      Moonrakr.navigate('posts');
      API.listPosts();
    });

    Moonrakr.PostsApp.on('post:show', function(id){
      Moonrakr.navigate('posts/' + id);
      API.showPost(id);
    });

    Moonrakr.addInitializer(function(){
      new PostsApp.Router({
        controller: API
      });
    });

  }); // return the module

}); // define