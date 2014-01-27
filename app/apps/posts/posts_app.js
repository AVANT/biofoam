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

  var postsSlug = Moonrakr.Config.postsSlug;

  var routeHash = {};
  routeHash[ postsSlug ] = 'listPosts';
  routeHash[ postsSlug + 'new' ] = 'newPost';
  routeHash[ postsSlug + ':id' ] = 'showPost';
  routeHash[ postsSlug + ':id/edit' ] = 'editPost';
  routeHash[ 'about' ] = 'showPost';

  Posts.Router = Marionette.AppRouter.extend({
    appRoutes: routeHash
  });

  var API = {
    listPosts: function(){
      Moonrakr.execute('clear:body:class');
      Moonrakr.execute('add:body:class', 'posts list');

      Posts.List.Controller.listPosts();
      // Moonrakr.execute('set:active:header', 'posts');
      // Moonrakr.execute('header:set:title', 'Posts');
    },
    showPost: function(id){
      Moonrakr.execute('clear:body:class');
      Moonrakr.execute('add:body:class', 'posts show');

      Posts.Show.Controller.showPost(id);
      // Moonrakr.execute('set:active:header', 'posts');
    },
    editPost: function(id){
      Moonrakr.execute('clear:body:class');
      Moonrakr.execute('add:body:class', 'posts edit');

      Posts.Edit.Controller.editPost(id);
      // Moonrakr.execute('set:active:header', 'posts');
    },
    newPost: function(){
      Moonrakr.execute('clear:body:class');
      Moonrakr.execute('add:body:class', 'posts new');

      Posts.New.Controller.newPost();
      // Moonrakr.execute('set:active:header', 'posts');
      // Moonrakr.execute('header:set:title', 'Posts: New');
    }
  };

  Moonrakr.on('posts:list', function(){
    Moonrakr.navigate( postsSlug );
    API.listPosts();
  });

  Moonrakr.on('post:show', function(id){
    Moonrakr.navigate( postsSlug + id);
    API.showPost(id);
  });

  Moonrakr.on('post:edit', function(id){
    Moonrakr.navigate( postsSlug + id + '/edit' );
    API.editPost(id);
  });

  Moonrakr.on('post:new', function(){
    Moonrakr.navigate( postsSlug + 'new' );
    API.newPost();
  });

  Moonrakr.on('post:about', function(){
    Moonrakr.navigate( 'about' );
    API.showPost('about');
  });

  Moonrakr.addInitializer(function(){
    new Posts.Router({
      controller: API
    });
  });

}); // return the module