require('app');

require('apps/threads/show/views/thread');
require('apps/threads/show/views/missing_thread');
require('apps/threads/show/views/posts');

return Moonrakr.module('Threads.Show', function (Show) {

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
      threadView = new Show.Thread();
    } else {
      threadView = new Show.MissingThread();
    }
    return threadView;
  }

  function getPostsView () {
    return getPosts().then(function(posts){
      return new Show.Posts({
        collection: posts
      });
    });
  }

  Show.Controller = {
    showThread: function (id) {

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
