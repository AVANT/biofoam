define(function(require){

  var Moonrakr = require('app');
  require('apps/posts/edit/edit_view');

  return Moonrakr.module('PostsApp.Edit', function(Edit){

    Edit.Controller = {
      editPost: function(id){
        // start and show spinner
        var loadingView = new Moonrakr.Common.Views.Loading({
          title: 'Artificial Loading Delay',
          message: 'Data loading is delayed to demonstrate how connectivity lag is handled.'
        });
        Moonrakr.secondRegion.show( loadingView );

        // get post model defer
        var fetchingContact = Moonrakr.request('post:entity', id);
        $.when(fetchingContact).done(function(post){
          // put model in the edit view
          var view;
          if(post !== undefined){
            view = new Edit.Post({
              model: post
            });

            view.on('form:submit', function(data){
              post.save(data);
              Moonrakr.PostsApp.trigger('post:show', post.get('id'));
            });

          }
          else {
            view = new Moonrakr.PostsApp.Show.MissingPost();
          }

          // show the edit view
          Moonrakr.secondRegion.show( view );
        });

      } // editPost
    }; // Edit.Controller

  }); // return

}); // define