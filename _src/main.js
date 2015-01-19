require(['require_config'],function(){

  require([
    'app',

    'apps/_entities/auth',
    'apps/_entities/menu',
    // 'apps/_entities/search',
    // 'apps/_entities/pages',
    'apps/_entities/posts',
    'apps/_entities/users',
    // 'apps/_entities/comments',
    'apps/_entities/helper_functions',

    'apps/media/media_app',
    'apps/posts/posts_app',
    'apps/menu/menu',
    'apps/footer/footer',
    // 'apps/pages/pages_app',
    'apps/users/users',
    // 'apps/comments/comments_app',
    'apps/auth/auth_app'

    ], function(Moonrakr){

      Moonrakr.start();

  });

});
