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
  // 'Static' page hacks
  routeHash[ 'about(/)' ] = 'aboutPage';
  routeHash[ 'privacy(/)' ] = 'privacyPage';
  routeHash[ 'sponsorship(/)' ] = 'sponsorshipPage';

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
    },
    // 'Static' page hacks
    aboutPage: function(){
      Moonrakr.trigger('post:about');
    },
    privacyPage: function(){
      Moonrakr.trigger('post:privacy');
    },
    sponsorshipPage: function(){
      Moonrakr.trigger('post:sponsorship');
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

  // 'Static' page hacks
  Moonrakr.on('post:about', function(){
    Moonrakr.navigate( 'about' );
    API.showPost('about');
  });
  Moonrakr.on('post:privacy', function(){
    Moonrakr.navigate( 'privacy' );
    API.showPost('privacy');
  });
  Moonrakr.on('post:sponsorship', function(){
    Moonrakr.navigate( 'sponsorship' );
    API.showPost('sponsorship');
  });

  Moonrakr.addInitializer(function(){
    new Posts.Router({
      controller: API
    });
  });

}); // return the module