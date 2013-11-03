define(function(require){

  var Moonrakr = require('app');
  require('apps/_entities/localstorage');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Comment = Backbone.Model.extend({
      url: 'comments'
    });
    Entities.configureStorage( Entities.Comment );

    Entities.CommentCollection = Backbone.Collection.extend({
      url: 'comments',
      model: Entities.Comment
      // comparator: 'date'
    });
    Entities.configureStorage( Entities.CommentCollection );

    var initializeComments = function(){
      console.log('comment entities initializing');
      var comments = new Entities.CommentCollection([
        {id:1, userId:1, postId:1, body: 'This will be Ced\'s comment'},
        {id:2, userId:2, postId:2, body: 'This will be Che\'s comment'},
        {id:3, userId:3, postId:3, body: 'This will be Sams\'s comment'},
      ]);
      comments.forEach(function(comment){
        comment.save();
      });
      return comments.models;
    };

    var API = {
      getCommentEntities: function(){
        var comments = new Entities.CommentCollection();
        var defer = $.Deferred();

        comments.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });

        var promise = defer.promise();

        // Handle the case where there are no users returned (this will happen when someone running this repo for the first time in a browser without the backend running)
        $.when(promise).done(function(comments){
          if (comments.length === 0){
            var models = initializeComments();
            comments.reset(models);
          }
        });

        return promise;
      },
      getCommentEntity: function(commentId){
        var comment = new Entities.Comment({id: commentId});
        var defer = $.Deferred();

        // defer.reject(); // DUBUG FAILURE

        comment.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
            // instead perhaps try passing the server errors thru?
          }
        });

        return defer.promise();
      }
    };

    Moonrakr.reqres.setHandler('comment:entities', function(){
      return API.getCommentEntities();
    });

    Moonrakr.reqres.setHandler('comment:entity', function(id){
      return API.getCommentEntity(id)
    });


  });

});