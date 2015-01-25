require('app');

require('apps/threads/show/views/thread');
require('apps/threads/show/views/missing_thread');

return Moonrakr.module('Threads.Show', function (Show) {

  function isTransmedialeID (id) {
    return id === 'test' ? true : false;
  }

  Show.Controller = {
    showThread: function (id) {
      Moonrakr.execute('add:body:class', 'loading');
      Moonrakr.Common.Controller.helper.cueLoadingView();

      var threadView;

      if ( isTransmedialeID(id) ) {
        // fetch TM thread posts
        threadView = new Show.Thread({});
      } else {
        threadView = new Show.MissingThread({});
      }


      Moonrakr.execute('remove:body:class', 'loading');
      Moonrakr.mainRegion.show( threadView );

    }
  };

});
