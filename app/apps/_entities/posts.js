require('app');
require('backbone.validation');
require('moment');

return Moonrakr.module('Entities', function(Entities){

  Entities.Post = Backbone.Model.extend({
    initialize: function(){
      _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
    },
    url: function(){
      if ( this.get('id') ){
        return Moonrakr.Config.api + '/posts/' + this.get('id');
      }
      else {
        return Moonrakr.Config.api + '/posts';
      }
    },
    defaults:{
      'body': ''
    },
    validation: {
      title: {
        rangeLength: [1, 200],
        msg: 'Title must be between 1 and 100 characters'
      },
      excerpt: {
        rangeLength: [1, 200],
        msg: 'Excerpt must be between 1 and 100 characters'
      },
      // body: {
      //   rangeLength: [1, 40],
      //   msg: 'Body must be between 1 and 40 characters'
      // }
    },
    parse: function( resp, options ){

      var obj = {};

      obj.headerImageUrl = this.parseHeaderImg( resp );

      obj.date = this.parseDate( resp );
      obj.tags = this.parseTags( resp );
      obj.authors = this.parseAuthors( resp );

      _.extend(resp, obj);

      return resp;
    },

    parseHeaderImg: function(resp){
      return resp.headerImage.filelink;
    },

    parseDate: function(resp){
      var date = new Date( resp.publishedAt );
      return moment( date.toString() ).format('MMMM Do YYYY');
    },

    parseTags: function( resp ){
      var toReturn = '';
      _.each( resp.tags, function( tag, i ){
        if( i === 0){
          toReturn = tag;
        } else {
          toReturn = toReturn + ', ' + tag;
        }
      });
      return toReturn;
    },

    parseAuthors: function( resp ){
      var toReturn = '';
      _.each( resp.authors, function( author, i ){
        if( i === 0){
          toReturn = author.fullName;
        } else {
          toReturn = toReturn + ', ' + author.fullName;
        }
      });
      return toReturn;
    }

  });

  Entities.Posts = Backbone.Collection.extend({
    url: function(){
      return Moonrakr.Config.api + '/posts';
    },
    model: Entities.Post,
    // comparator: 'title'
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
      console.log('fire request to server in next line');
      posts.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(posts){
        if(posts.length === 0){
          // if we dont have any posts yet, create some for convenience
          // var models = initializePosts();
          // posts.reset(models);
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
          error: function(){
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