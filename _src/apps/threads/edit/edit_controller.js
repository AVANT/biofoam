require('app');

require('apps/threads/edit/views/thread');
require('apps/threads/edit/views/missing_thread');
require('apps/threads/edit/views/posts');

return Moonrakr.module('Threads.Edit', function (Edit) {

  function cueLoading () {
    Moonrakr.execute('add:body:class', 'loading');
    Moonrakr.Common.Controller.helper.cueLoadingView();
  }

  function stopLoading () {
    Moonrakr.execute('remove:body:class', 'loading');
  }

  function isTransmedialeID (id) {
    return id === 'capture-all' ? true : false;
  }

  function getPosts () {
    return Moonrakr.request('post:entities', true);
  }

  function loadThreadView (id) {
    var threadView;
    if ( isTransmedialeID(id) ) {
      threadView = new Edit.Thread();
    } else {
      threadView = new Edit.MissingThread();
    }
    return threadView;
  }

  function getPostsView () {
    return getPosts().then(function(posts){
      console.log('posts: ', posts);
      return new Edit.Posts({
        collection: posts
      });
    });
  }

  Edit.Controller = {
    editThread: function (id) {
      cueLoading();
      var threadView = loadThreadView(id);
      getPostsView().then(function(postsView){

        threadView.on('show', function(){
          threadView.postsRegion.show( postsView );
        });

        stopLoading();
        Moonrakr.mainRegion.show( threadView );
      });

    }
  };

});
