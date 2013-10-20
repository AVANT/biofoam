define(function(require){

  var Moonrakr = require('app');
  require('apps/comments/show/show_controller');
  require('apps/comments/list/list_controller');

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
      listComments: function(id){
        CommentsApp.List.Controller.listComments(id);
      },
      showComment: function(id){
        CommentsApp.Show.Controller.showComment(id);
      },
      newComment: function(){
        CommentsApp.New.Controller.newComment();
      },
      editComment: function(){
        CommentsApp.Edit.Controller.editComment();
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
      // pass in comment id
      API.showComment(id);
      // return view?
    });

    Moonrakr.on('comment:new', function(){
      API.newComment();
      // return create comment view? (textarea or redactor?)
    });

    Moonrakr.on('comment:edit', function(id){
      API.editComment(id);
      // will this be the editor comment editing ability
    });


  });

});