require(['requireConfig'],function(){

  require([
    'app',

    'apps/_entities/header',
    'apps/_entities/search',
    'apps/_entities/about',
    'apps/_entities/posts',
    'apps/_entities/users',
    'apps/_entities/comments',
    'apps/_entities/helperFunctions',

    'apps/_common/views/loading',
    'apps/_common/views/cms_panel',
    'apps/_common/controller/helper_functions',

    'apps/header/header_app',
    'apps/about/about_app',
    'apps/users/users_app',
    'apps/posts/posts_app',
    'apps/comments/comments_app',
    'apps/auth/auth_app'

    ], function(Moonrakr){

      Moonrakr.start();

  });

});
