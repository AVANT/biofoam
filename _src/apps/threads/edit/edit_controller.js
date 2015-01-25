require('app');

require('apps/threads/edit/views/thread');
require('apps/threads/edit/views/missing_thread');

return Moonrakr.module('Threads.Edit', function (Edit) {

  function isTransmedialeID (id) {
    return id === 'test' ? true : false;
  }

  Edit.Controller = {
    editThread: function (id) {

      // cue loading
      Moonrakr.execute('add:body:class', 'loading');
      Moonrakr.Common.Controller.helper.cueLoadingView();

      var threadView;

      if ( isTransmedialeID(id) ) {
        // fetch TM thread posts
        threadView = new Edit.Thread({});
      } else {
        threadView = new Edit.MissingThread({});
      }

      Moonrakr.execute('remove:body:class', 'loading');
        Moonrakr.mainRegion.show( threadView );

    }
  };

});
