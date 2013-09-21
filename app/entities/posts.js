define(function(require){
  var Moonrakr = require('app');

  return Moonrakr.module('Entities', function(Entities){

    Entities.Post = Backbone.Model.extend({});

    Entities.PostCollection = Backbone.Collection.extend({
      model: Entities.Post,
      comparator: 'title'
    });

    var posts;

    var initializePosts = function(){
      posts = new Entities.PostCollection([
        {id: 1, title: 'made up title', excerpt: 'short thingy here', body: 'here is some body text'},
        {id: 2, title: 'made up title', excerpt: 'short thingy here', body: 'here is some body text'},
        {id: 3, title: 'made up title', excerpt: 'short thingy here', body: 'here is some body text'},
      ]);
    };

    var API = {
      getPostEntities: function(){
        if(posts === undefined){
          initializePosts();
        }
        return posts;
      }
    };

    Moonrakr.reqres.setHandler("post:entities", function(){
      return API.getPostEntities();
    });
  });

});