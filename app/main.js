require(['requireConfig'],function(){

  require([
    'app',

    'apps/_entities/header',
    'apps/_entities/about',
    'apps/_entities/posts',
    'apps/_entities/users',

    'apps/_common/views/views_loading',

    'apps/header/header_app',
    'apps/about/about_app',
    'apps/users/users_app',
    'apps/posts/posts_app',
    'apps/auth/auth_app'

    ], function(Moonrakr){

      Moonrakr.start();

  });

});
