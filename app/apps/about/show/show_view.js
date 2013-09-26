define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _aboutMessage = require('text!apps/about/show/templates/aboutMessage.html');

  return Moonrakr.module('AboutApp.Show', function(Show){

    Show.Message = Marionette.ItemView.extend({
      template: Handlebars.compile( _aboutMessage )
    });

  });

});