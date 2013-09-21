define(function(require){

  var Marionette = require('marionette');

  var Moonrakr = new Marionette.Application();

  Moonrakr.addRegions({
    mainRegion: '#main',
    secondRegion: '#second'
  });

  // IDEA ABOUT CLEANING THIS UP ON PAGE 212
  Moonrakr.navigate = function(route, options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  Moonrakr.getCurrentRoute = function(){
    return Backbone.history.fragment;
  };

  Moonrakr.on('initialize:after', function(){
    console.log('Moonrakr started');
    if(Backbone.history){
      Backbone.history.start();

      if (this.getCurrentRoute() === ""){
        Moonrakr.trigger('posts:list');
      }
    }
  });


  return Moonrakr;

});
