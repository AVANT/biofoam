require(['requireConfig'],function(){

  require([
    'app',
    'apps/header/show/show'
    ], function(Moonrakr){

      Moonrakr.start();

  }); // app

}); // requireConfig
