require(['requireConfig'],function(){

  require([
    'app',

    'apps/_entities/posts',
    'apps/_entities/header',
    'apps/_entities/users',

    'apps/header/header_app',
    'apps/about/about_app',
    'apps/users/users_app',
    'apps/posts/posts_app'
    ], function(Moonrakr){

      Moonrakr.start();

  }); // app

}); // requireConfig
