define(function(require){

  var Moonrakr = require('app');
  var hmm = require('entities/localstorage');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Post = Backbone.Model.extend({
      url: "posts"
    });
    // SETTING UP MODEL TO USE LOCAL STORAGE
    Entities.configureStorage(Entities.Post);

    Entities.PostCollection = Backbone.Collection.extend({
      url: "posts",
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
      return posts;
    };

    var API = {
      getPostEntities: function(){
        var posts = new Entities.PostCollection();
        posts.fetch();
        if(posts.length === 0){
          // if we dont have any contacts yet, create some for convenience
          return initializePosts();
        }
        return posts;
      },
      getPostEntity: function(postId){
        var post = new Entities.Post({id: postId});
        var defer = $.Deferred();
        setTimeout(function(){
          post.fetch({
            success: function(data){
              defer.resolve(data);
            }
          });
        }, 2000);
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