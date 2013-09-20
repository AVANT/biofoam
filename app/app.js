define(function(require){

  var Marionette = require('marionette');

  var Moonrakr = new Marionette.Application();

  Moonrakr.addRegions({
    mainRegion: '#main'
  })

  Moonrakr.on('initialize:after', function(){
    console.log('Moonrakr started');
    // Moonrakr.Header.Show.Controller.showHeader();
  })

  return Moonrakr;

});
