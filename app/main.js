require(['require_config'],function(){

  require([
    'app',

    'apps/_entities/header',
    'apps/_entities/search',
    'apps/_entities/pages',
    'apps/_entities/posts',
    'apps/_entities/users',
    'apps/_entities/comments',
    'apps/_entities/helper_functions',

    'apps/_common/views/loading',
    'apps/_common/views/cms_panel',
    'apps/_common/controller/helper_functions',
    'apps/_common/jquery/helper_functions',

    'apps/header/header_app',
    'apps/pages/pages_app',
    'apps/users/users_app',
    'apps/posts/posts_app',
    'apps/comments/comments_app',
    'apps/auth/auth_app'

    ], function(Moonrakr){

      Moonrakr.start();

  });

});
