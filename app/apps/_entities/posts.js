define(function(require){

  var Moonrakr = require('app');
  require('backbone.validation');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Post = Backbone.Model.extend({
      url: function(){
        if ( this.get('id') ){
          return Moonrakr.Config.api + '/posts/' + this.get('id');
        }
        else {
          return Moonrakr.Config.api + '/posts';
        }
      },
      validation: {
        title: {
          rangeLength: [1, 40],
          msg: 'Title must be between 1 and 40 characters'
        }
      }
    });

    Entities.Posts = Backbone.Collection.extend({
      url: function(){
        return Moonrakr.Config.api + '/posts';
      },
      model: Entities.Post,
      comparator: 'title'
    });

    var initializePosts = function(){

      var posts = new Entities.Posts([
        {id: 1, title: 'made up title number one', excerpt: 'short thingy here', body: 'here is some body text'},
        {id: 2, title: 'made up title number two', excerpt: 'short thingy here', body: 'here is some body text'},
        {id: 3, title: 'made up title number three', excerpt: 'short thingy here', body: 'here is some body text'},
      ]);
      posts.forEach(function(post){
        post.save();
      });
      return posts.models;
    };

    var API = {
      getPostEntities: function(){
        var posts = new Entities.Posts();
        var defer = $.Deferred();
        posts.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(posts){
          if(posts.length === 0){
            // if we dont have any contacts yet, create some for convenience
            // var models = initializePosts();
            posts.reset(models);
          }
        });
        return promise;
      },
      getPostEntity: function(postId){
        var post = new Entities.Post({ id: postId});
        var defer = $.Deferred();
        setTimeout(function(){
          post.fetch({
            success: function(data){
              defer.resolve(data);
            },
            error: function(data){
              defer.resolve(undefined);
            }
          });
        }, 0);
        return defer.promise();
      }
    };

    Moonrakr.reqres.setHandler('post:entities', function(){
      return API.getPostEntities();
    });

    Moonrakr.reqres.setHandler('post:entity', function(id){
      return API.getPostEntity(id);
    });

  });

});