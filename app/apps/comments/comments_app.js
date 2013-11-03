define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/forpost/show_controller');
  require('apps/comments/show/foruser/show_controller');
  require('apps/comments/list/forpost/list_controller');
  require('apps/comments/list/foruser/list_controller');
  require('apps/comments/new/new_controller');

  return Moonrakr.module('CommentsApp', function(CommentsApp){

    // USED ONLY FOR DEVELOPMENT //
    CommentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        // 'comments': 'listForUserComments'
        // 'comments/new': 'newComment',
        // 'comments/:id': 'showPostComment'
      }
    });


    var API = {

      // will eventually need to handle taking in a comments/for/:id value
      listForPostComments: function(){
        return CommentsApp.List.ForPost.Controller.listComments();
      },
      // will eventually need to handle taking in a comments/for/:id value
      listForUserComments: function(){
        return CommentsApp.List.ForUser.Controller.listComments();
      },


      // RETURN CALLS //
      showForUserComment: function(model){
        return CommentsApp.Show.ForUser.Controller.showComment(model);
      },
      showForPostComment: function(model){
        return CommentsApp.Show.ForPost.Controller.showComment(model);
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


    // will eventually need to handle taking in a comments/for/:id value
    Moonrakr.reqres.setHandler('comments:listforpost', function(){
      return API.listForPostComments();
    });

    // will eventually need to handle taking in a comments/for/:id value
    Moonrakr.reqres.setHandler('comments:listforuser', function(){
      return API.listForUserComments();
    });

    Moonrakr.reqres.setHandler('comment:showforpost', function(model){
      return API.showForPostComment(model);
    });

    Moonrakr.reqres.setHandler('comment:showforuser', function(model){
      return API.showForUserComment(model);
    });

    Moonrakr.reqres.setHandler('comment:new:return', function(){
      return API.newCommentReturn();
    });

    Moonrakr.on('comment:edit', function(id){
      API.editComment(id);
    });

  });

});