define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/new/new_views');
  require('apps/_common/views/redactor');

  return Moonrakr.module('PostsApp.New', function(New){

    New.Controller = {

      newPost: function(){

          /////////////////////////////
         // GET VIEWS AND THE MODEL //
        /////////////////////////////

        // GET POST MODEL FROM THIS APP OR CREATE A NEW ONE
        var newPost = this.getNewPost();

        // INIT LAYOUT VIEW AND INSERT MODEL
        var layoutView = new New.Post({
          model: newPost
        });

        // init imageUpload view and insert model photo??
        var imageUploadView = new New.ImageUpload();

        // INIT REDACTOR VIEW AND INSERT MODEL BODY
        var redactorView = this.getRedactorView( newPost.get('body') );


          ////////////////////////
         // SET EVENT HANDLERS //
        ////////////////////////

        // SHOW REDACTOR VIEW WHEN LAYOUT VIEW IS RENDERED
        layoutView.on('render', function(){
          layoutView.imageUploadRegion.show( imageUploadView );
          layoutView.redactorRegion.show( redactorView );
        });

        // ON 'localsave' EVENT, ATTACH THE NEW POST TO THIS SUB-APP
        layoutView.on('model:changed', function(){
          Moonrakr.PostsApp.New.newPost = newPost;
        });

        // ON 'redactor:changed' EVENT, ATTACH THE NEW POST TO THIS SUB-APP
        redactorView.on('redactor:changed', function(){
          Moonrakr.PostsApp.New.newPost = newPost;
        });

        // ON 'post:delete' EVENT, CLEAR MODEL AND GO TO NAVIGATE TO THE HOME PAGE
        layoutView.on('post:delete', function(model){
          Moonrakr.PostsApp.New.newPost = null;
          Moonrakr.trigger('posts:list');
        });

        // ON 'form:submit' EVENT, GET AN ID AND SAVE THAT SHIT
        layoutView.on('form:submit', function(data){

          // GET HIGHEST ID OF ALL POSTS -- not needed with live server
          var fetchingPosts = Moonrakr.request('post:entities');
          $.when(fetchingPosts).done(function(posts){

            var highestId = posts.max(function(c){ return c.id });
            highestId = highestId.get('id');
            data.id = highestId + 1
            if(newPost.save(data)){
              Moonrakr.trigger('post:show', newPost.get('id'));
            }
            else {
              layoutView.triggerMethod('form:data:invalid', newPost.validationError);
            }

          });
        }); // layoutView.on


          /////////////////////////
         // DISPLAY *THE* VIEW  //
        /////////////////////////

        // DISPLAY THE LAYOUT VIEW ON THE MAIN REGION
        Moonrakr.mainRegion.show(layoutView);

      }, // newPost()

      getNewPost: function(){
        return Moonrakr.PostsApp.New.newPost || new Moonrakr.Entities.Post();
      },

      getRedactorView: function(body){
        return new Moonrakr.Common.Views.Redactor({
          textareaId: 'post-body',
          textareaValue: body
        });
      }

    }

  });

});