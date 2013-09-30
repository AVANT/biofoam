define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/list/list_controller');
  require('apps/posts/show/show_controller');
  require('apps/posts/edit/edit_controller');
  require('apps/posts/new/new_controller');

  return Moonrakr.module("PostsApp",function(PostsApp){

    PostsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'posts': 'listPosts',
        'posts/new': 'newPost',
        'posts/:id': 'showPost',
        'posts/:id/edit': 'editPost'
      }
    });

    var API = {
      listPosts: function(){
        PostsApp.List.Controller.listPosts();
      },
      showPost: function(id){
        PostsApp.Show.Controller.showPost(id);
      },
      editPost: function(id){
        PostsApp.Edit.Controller.editPost(id);
      },
      newPost: function(){
        PostsApp.New.Controller.newPost();
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

    Moonrakr.PostsApp.on('post:edit', function(id){
      Moonrakr.navigate('posts/' + id + '/edit');
      API.editPost(id);
    });

    Moonrakr.PostsApp.on('post:new', function(){
      Moonrakr.navigate('posts/new');
      API.newPost();
    })

    Moonrakr.addInitializer(function(){
      new PostsApp.Router({
        controller: API
      });
    });

  }); // return the module

}); // define