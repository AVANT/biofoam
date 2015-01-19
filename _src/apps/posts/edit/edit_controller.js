require('app');
require('apps/_common/views/redactor');
require('apps/posts/edit/edit_views');

return Moonrakr.module('Posts.Edit', function(Edit){

  Edit.Controller = {
    editPost: function(id){

      // start and show spinner
      Moonrakr.Common.Controller.helper.cueLoadingView();

      var that = this;

      var fetchingPost = Moonrakr.request('post:entity', id);
      $.when(fetchingPost).done(function(post){

        var layoutView;
        if(post !== undefined){

            ///////////////
           // GET VIEWS //
          ///////////////

          layoutView = new Edit.Post({
            model: post
          });

          window.myModel = post;

          var imageUploadView = Moonrakr.request('media:new');
          // need to shove headerimage into this view
          imageUploadView.trigger('display', post.get('headerImageUrl'));


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

          // DELETE HANDLER
          layoutView.on('post:delete', function(model){
            console.log('gonna call model.destory');
            model.destroy();
            Moonrakr.trigger('posts:list');
          });

          // SAVE HANDLER
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

          imageUploadView.on('media:save:success', function(model){
            // wrap headerImage in an object for the backend
            post.set('headerImage', { 'id': model.get('id') });
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