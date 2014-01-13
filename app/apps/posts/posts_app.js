/**
# Posts App

The posts app provides all the url routing and event routing to the subapps.

Routes:
- /posts
- /posts/new
- /posts/:id
- /posts/:id/edit

@module posts
@requires moonrakr, posts.new, posts.list, posts.show, posts.edit
**/

require('app');
require('apps/posts/list/list_controller');
require('apps/posts/show/show_controller');
require('apps/posts/edit/edit_controller');
require('apps/posts/new/new_controller');

return Moonrakr.module('Posts',function(Posts){

  Posts.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'posts': 'listPosts',
      'posts/new': 'newPost',
      'posts/:id': 'showPost',
      'posts/:id/edit': 'editPost'
    }
  });

  var API = {
    listPosts: function(){
      Moonrakr.execute('set:body:class', 'home');
      Posts.List.Controller.listPosts();
      // Moonrakr.execute('set:active:header', 'posts');
      // Moonrakr.execute('header:set:title', 'Posts');
    },
    showPost: function(id){
      Moonrakr.execute('set:body:class', 'post');
      Posts.Show.Controller.showPost(id);
      // Moonrakr.execute('set:active:header', 'posts');
    },
    editPost: function(id){
      Posts.Edit.Controller.editPost(id);
      // Moonrakr.execute('set:active:header', 'posts');
    },
    newPost: function(){
      Posts.New.Controller.newPost();
      // Moonrakr.execute('set:active:header', 'posts');
      // Moonrakr.execute('header:set:title', 'Posts: New');
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
  });

  Moonrakr.addInitializer(function(){
    new Posts.Router({
      controller: API
    });
  });

}); // return the module