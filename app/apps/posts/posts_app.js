/**
# Posts App

The posts app provides all the url routing and event routing to the subapps.

Routes:
- /posts
- /posts/new
- /posts/:id
- /posts/:id/edit

Subapps:
- _common
- Edit
- List
- New
- Show

@module Posts
**/

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
        Moonrakr.execute('set:active:header', 'posts');
        Moonrakr.execute('header:set:title', 'Posts');
      },
      showPost: function(id){
        PostsApp.Show.Controller.showPost(id);
        Moonrakr.execute('set:active:header', 'posts');
      },
      editPost: function(id){
        PostsApp.Edit.Controller.editPost(id);
        Moonrakr.execute('set:active:header', 'posts');
      },
      newPost: function(){
        PostsApp.New.Controller.newPost();
        Moonrakr.execute('set:active:header', 'posts');
        Moonrakr.execute('header:set:title', 'Posts: New');
      }
    };

    Moonrakr.on('posts:list', function(){
      Moonrakr.navigate('posts');
      API.listPosts();
    });

    Moonrakr.on('post:show', function(id){
      Moonrakr.navigate('posts/' + id);
      API.showPost(id);
    });

    Moonrakr.on('post:edit', function(id){
      Moonrakr.navigate('posts/' + id + '/edit');
      API.editPost(id);
    });

    Moonrakr.on('post:new', function(){
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