require('app');
require('handlebars');

var _thread = require('text!apps/threads/show/templates/thread.html');

return Moonrakr.module('Threads.Show', function (Show) {

  // TODO: make this a layout/composite view when we need to add in post card section
  Show.Thread = Marionette.Layout.extend({
    tagName: 'section',
    className: 'thread',
    events: {},
    template: Handlebars.compile( _thread ),
    regions: {
      postsRegion: '#posts-region'
    }
  });

});
