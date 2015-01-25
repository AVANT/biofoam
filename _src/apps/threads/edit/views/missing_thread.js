require('app');
require('handlebars');

var _missingThread = require('text!apps/threads/edit/templates/missing_thread.html');

return Moonrakr.module('Threads.Edit', function(Edit){

  Edit.MissingThread = Marionette.ItemView.extend({
    template: Handlebars.compile( _missingThread )
  });

});
