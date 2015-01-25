require('app');
require('handlebars');

var _thread = require('text!apps/threads/edit/templates/thread.html');

return Moonrakr.module('Threads.Edit', function (Edit) {

  // TODO: make this a layout/composite view when we need to add in post card section
  Edit.Thread = Marionette.ItemView.extend({
    tagName: 'section',
    className: 'thread',
    events: {},
    template: Handlebars.compile( _thread )
  });

});
