define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/show_controller');
  require('apps/comments/list/list_controller');
  require('apps/comments/new/new_controller');

  return Moonrakr.module('CommentsApp', function(CommentsApp){

    // * * * * * * * * * * * * * * * * * * * * * * * * * //
    // v1.0 dosent have comments getting its own router  //

    CommentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'comments': 'listComments',
        'comments/new': 'newComment',
        'comments/:id': 'showComment',
        'comments/:id/edit': 'editComment'
      }
    });

    // * * * * * * * * * * * * * * * * * * * * * * * * * //

    var API = {
      listComments: function(){
        CommentsApp.List.Controller.listComments();
      },
      showComment: function(id){
        CommentsApp.Show.Controller.showComment(id);
      },
      newComment: function(){
        CommentsApp.New.Controller.newComment();
      },
      editComment: function(){
        CommentsApp.Edit.Controller.editComment();
      },

      // returns views
      showCommentReturn: function(id){
        return CommentsApp.Show.Controller.showCommentReturn(id);
      },
      newCommentReturn: function(){
        return CommentsApp.New.Controller.newCommentReturn();
      }
    };

    Moonrakr.addInitializer(function(){
      new CommentsApp.Router({
        controller: API
      });
    });

    // * * * * * * * * * * * * //
    // 'user:comments:list' ?? //
    // 'post:comments:list' ?? //
    Moonrakr.on('comments:list', function(){
      // pass in user id / post id ?
      API.listComments();
      // return composite view of comments?
    });
    // * * * * * * * * * * * * //


    Moonrakr.on('comment:show', function(id){
      API.showComment(id);
    });

    Moonrakr.reqres.setHandler('comment:show:return', function(id){
      return API.showCommentReturn(id);
    });

    Moonrakr.on('comment:new', function(){
      API.newComment();
    });

    Moonrakr.reqres.setHandler('comment:new:return', function(){
      return API.newCommentReturn();
    });

    Moonrakr.on('comment:edit', function(id){
      API.editComment(id);
      // will this be the editor comment editing ability
    });

  });

});