define(function(require){

  var Marionette = require('marionette');

  var Moonrakr = new Marionette.Application();

  Moonrakr.addRegions({
    mainRegion: '#main',
    secondRegion: '#second'
  })

  Moonrakr.on('initialize:after', function(){
    console.log('Moonrakr started');
    if(Backbone.history){
      Backbone.history.start();
    }
  })

  return Moonrakr;

});
