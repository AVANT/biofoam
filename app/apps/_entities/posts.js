define(function(require){

  var Moonrakr = require('app');
  require('apps/_entities/localstorage');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Post = Backbone.Model.extend({
      url: 'posts',
      validate: function(attrs, options){
        var errors = {};
        if (! attrs.title){
          errors.title = "can't be blank";
        }
        if (! attrs.excerpt){
          errors.excerpt = "can't be blank";
        }
        if (! attrs.body){
          errors.body = "can't be blank";
        }
        if(! _.isEmpty(errors)){
          return errors;
        }
      }
    });
    // SETTING UP MODEL TO USE LOCAL STORAGE
    Entities.configureStorage(Entities.Post);

    Entities.PostCollection = Backbone.Collection.extend({
      url: 'posts',
      model: Entities.Post,
      comparator: 'title'
    });
    // SETTING UP COLLECTION TO USE LOCAL STORAGE
    Entities.configureStorage(Entities.PostCollection);

    var initializePosts = function(){

      var posts = new Entities.PostCollection([
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
        var posts = new Entities.PostCollection();
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
            var models = initializePosts();
            posts.reset(models);
          }
        });
        return promise;
      },
      getPostEntity: function(postId){
        var post = new Entities.Post({id: postId});
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
        }, 1000);
        return defer.promise();
      }
    };

    Moonrakr.reqres.setHandler("post:entities", function(){
      return API.getPostEntities();
    });

    Moonrakr.reqres.setHandler("post:entity", function(id){
      return API.getPostEntity(id);
    });

  });

});