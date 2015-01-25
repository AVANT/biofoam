require('app');
require('handlebars');

var _missingThread = require('text!apps/threads/show/templates/missing_thread.html');

return Moonrakr.module('Threads.Show', function(Show){

  Show.MissingThread = Marionette.ItemView.extend({
    template: Handlebars.compile( _missingThread )
  });

});
