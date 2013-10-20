define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/show_view');

  return Moonrakr.module('CommentsApp.Show', function(Show){

    Show.Controller = {
      showComment: function(id){

        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

        var fetchingComment = Moonrakr.request('comment:entity', id);
        $.when(fetchingComment).done(function(comment){

          var commentLayoutView;

          if (comment !== undefined){

            commentLayoutView = new Show.Comment({
              model: comment
            });

            // commentLayoutView.on('render:user', function(userId){
            //   var fetchingUser = Moonrakr.request('user:entity', userId);
            //   $.when(fetchingUser).done(function(user){
            //     var userView;
            //     if (user !== undefined){
            //       userView = new Show.User({
            //         model: user
            //       });
            //     }
            //     else{}
            //       commentLayoutView.userInformation.show(userView);
            //   }); // when
            // }); // render:user

          } // comment
          else {
            commentLayoutView = new Show.MissingComment();
          }

          Moonrakr.mainRegion.show( commentLayoutView );

        }); // when fetchingComment
      } // showComment
    } // Show.Controller

  });

});