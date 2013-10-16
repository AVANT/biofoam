define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/edit/edit_view');

  return Moonrakr.module('PostsApp.Edit', function(Edit){

    Edit.Controller = {
      editPost: function(id){

          ////////////////////////
         // LOADING TRANSITION //
        ////////////////////////

        // start and show spinner
        var loadingView = new Moonrakr.Common.Views.Loading();
        Moonrakr.mainRegion.show( loadingView );

          ///////////////////////////////
         // FETCH AND PROMISE HANLDER //
        ///////////////////////////////

        var that = this;
        // get post model defer
        var fetchingPost = Moonrakr.request('post:entity', id);
        $.when(fetchingPost).done(function(post){
          // put model in the edit view
          var layoutView;
          if(post !== undefined){

              ///////////////
             // GET VIEWS //
            ///////////////

            // init layout view and insert model
            layoutView = new Edit.Post({
              model: post
            });

            // init imageUpload view and insert model photo??
            var imageUploadView = new Moonrakr.Common.Views.ImageUpload();

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
              model.destroy();
              Moonrakr.trigger('posts:list');
            });

            // SAVE HANDLER //
            // layoutView.on('form:submit', function(data){
              // if(post.save(data)){
            layoutView.on('form:submit', function(data){
              if(post.save(data)){
                Moonrakr.trigger('post:show', post.get('id'));
              }
              else {
                layoutView.triggerMethod('form:data:invalid', post.validationError);
              }
            });

          }
          else {
            layoutView = new Moonrakr.PostsApp.Show.MissingPost();
          }

            /////////////////////////
           // DISPLAY *THE* VIEW  //
          /////////////////////////

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