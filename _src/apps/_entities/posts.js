require('app');
require('moment');

return Moonrakr.module('Entities', function(Entities){

  Entities.Post = Backbone.Model.extend({
    initialize: function(){
      // _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
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
    parse: function( resp ){
      var obj = {};

      obj.headerImageUrl = this.parseHeaderImg( resp );
      obj.date = this.parseDate( resp );
      obj.authors = this.parseAuthors( resp );

      return _.extend({}, resp, obj);
    },

    parseHeaderImg: function(resp){
      if (resp.headerImage) {
        return resp.headerImage.filelink;
      }
      return '';
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
      var toReturn = resp.authorsArray;
      toReturn = toReturn.toString().replace(",",", ");
      return toReturn;
    }

  });

  Entities.Posts = Backbone.Collection.extend({
    url: function () {
      if(this.unpublishedFlag){
        return Moonrakr.Config.api + '/posts?status=unpublished';
      } else {
        return Moonrakr.Config.api + '/posts';
      }
    },

    model: Entities.Post,

    initialize: function (options) {
      this.unpublishedFlag = options.unpublishedFlag;
      this.on('add', this.removeReserved, this);
    },

    removeReserved: function (m) {
      var that = this;
      Moonrakr.Config.reservedSlugs.some(function(reserved){
        if ( m.get('id') === reserved ) {
          that.remove(m);
        }
      });
    }

  });

  // API Helper Functions //
  function filterPostsByThread (posts) {

  }

  var API = {
    getPostEntitiesByThread: function (threadQuery) {
      // return this.getPostEntities(true).then(function(posts){
      //   return _.filter(posts, function(post){
      //     post.met
      //   });
      // });
      return this.getPostEntities(true);
    },
    getPostEntities: function(unpublishedFlag){

      if(unpublishedFlag){
        unpublishedFlag = true;
      } else {
        unpublishedFlag = false;
      }

      var posts = new Entities.Posts({
        unpublishedFlag: unpublishedFlag
      });

      var defer = $.Deferred();

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

  Moonrakr.reqres.setHandler('post:entities:byThread', function ( threadQuery ) {
    return API.getPostEntitiesByThread( threadQuery );
  });

  Moonrakr.reqres.setHandler('post:entities', function (unpublishedFlag) {
    return API.getPostEntities( unpublishedFlag );
  });

  Moonrakr.reqres.setHandler('post:entity', function (id) {
    return API.getPostEntity( id );
  });

});
