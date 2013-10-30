define(function(require){

  var Moonrakr = require('app');
  // require('apps/comments/show/show_controller');
  require('apps/comments/show/post/show_controller');
  require('apps/comments/list/list_controller');
  require('apps/comments/new/new_controller');

  return Moonrakr.module('CommentsApp', function(CommentsApp){

    // USED ONLY FOR DEVELOPMENT //
    CommentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'comments': 'listComments',
        // 'comments/new': 'newComment',
        'comments/:id': 'showPostComment'
      }
    });


    var API = {
      listComments: function(){
        CommentsApp.List.Controller.listComments();
      },

      // DEBUG CALL //
      showPostComment: function(id){
        CommentsApp.Show.Post.Controller.showComment(id);
      },


      // RETURN CALLS //
      // showUserComment: function(id){
      //   return CommentsApp.Show.User.Controller.showComment(id);
      // },
      showPostCommentReturn: function(id){
        return CommentsApp.Show.Post.Controller.showCommentReturn(id);
      },

      newCommentReturn: function(){
        return CommentsApp.New.Controller.newCommentReturn();
      }
    };


    // init comments router with api //
    Moonrakr.addInitializer(function(){
      new CommentsApp.Router({
        controller: API
      });
    });


    // set application wide triggers //
    Moonrakr.on('comments:list', function(){
      API.listComments();
    });


    Moonrakr.reqres.setHandler('comment:show:return', function(id){
      return API.showPostCommentReturn(id);
    });

    // Moonrakr.on('comment:new', function(){
    //   API.newComment();
    // });

    Moonrakr.reqres.setHandler('comment:new:return', function(){
      return API.newCommentReturn();
    });

    Moonrakr.on('comment:edit', function(id){
      API.editComment(id);
    });

  });

});