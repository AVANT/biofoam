define(function(require){

  var Moonrakr = require('app');
  require('apps/_common/views/redactor');
  require('apps/posts/edit/edit_views');

  return Moonrakr.module('Posts.Edit', function(Edit){

    Edit.Controller = {
      editPost: function(id){


        // start and show spinner
        Moonrakr.Common.Controller.helper.cueLoadingView();

        var that = this;
        // get post model defer
        var fetchingPost = Moonrakr.request('post:entity', id);
        $.when(fetchingPost).done(function(post){
          // put model in the edit view
          var layoutView;
          if(post !== undefined){

              Moonrakr.execute('header:set:title', 'Posts: Edit: ' + post.get('title'));

              ///////////////
             // GET VIEWS //
            ///////////////

            // init layout view and insert model
            layoutView = new Edit.Post({
              model: post
            });

            // init imageUpload view
            var imageUploadView = new Edit.ImageUpload();

            // init redactor view and insert model.body
            var redactorView = that.getRedactorView( post.get('body') );

              ////////////////////////
             // SET EVENT HANDLERS //
            ////////////////////////

            // show redactor view when layout view is rendered
            layoutView.on('render', function(){
              layoutView.imageUploadRegion.show( imageUploadView );
              layoutView.redactorRegion.show( redactorView );
            });

            // DELETE HANDLER //
            layoutView.on('post:delete', function(model){
              console.log('gonna call model.destory');
              model.destroy();
              Moonrakr.trigger('posts:list');
            });

            // SAVE HANDLER //
            layoutView.on('form:submit', function(data){

              post.save(data, {
                success: function(){
                  Moonrakr.trigger('post:show', post.get('id'));
                },
                error: function(){
                  // TODO set and handle validation errors
                  layoutView.triggerMethod('form:data:invalid', post.validationError);
                }
              });

            });

          }
          else {
            layoutView = new Moonrakr.Posts.Show.MissingPost();
          }

          // show the edit layoutView
          Moonrakr.mainRegion.show( layoutView );
        });

      }, // editPost

      getRedactorView: function(body){
        return new Moonrakr.Common.Views.Redactor({
          textareaId: 'post-body', // not well decoupled from
          textareaValue: body
        });
      }

    }; // Edit.Controller

  }); // return

}); // define