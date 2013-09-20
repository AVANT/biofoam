define(function(require){

  var Moonrakr = require("app");

  return Moonrakr.module("PostsApp",function(PostsApp){

    PostsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "posts": "listPosts"
      }
    });

    var API = {
      listPosts: function(){
        console.log("route to list contacts was triggered");
      }
    }

    Moonrakr.addInitializer(function(){
      new PostsApp.Router({
        controller: API
      });
    });

  }); // return the module

}); // define