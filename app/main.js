require(['requireConfig'],function(){

  require([
    'app',
    'entities/posts',
    'apps/header/header_app',
    'apps/posts/posts_app'
    ], function(Moonrakr){

      Moonrakr.start();

  }); // app

}); // requireConfig
