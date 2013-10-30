define(function(require){

  var config = require('config');
  var Marionette = require('marionette');

  window.Moonrakr = new Marionette.Application();
  // var Moonrakr = new Marionette.Application();

  Moonrakr.addRegions({
    headerRegion: '#header',
    mainRegion: '#main',
    modalRegion: '#modal'
  });

  // IDEA ABOUT CLEANING THIS UP ON PAGE 212
  Moonrakr.navigate = function(route, options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  Moonrakr.getCurrentRoute = function(){
    return Backbone.history.fragment;
  };

  Moonrakr.getCurrentTrigger = function(){
    var routeStr = Backbone.history.fragment;
  };

  // extend backbone sync
  var backboneSync = Backbone.sync;
  Backbone.sync = function (method, model, options){
    options = _.extend(options, {
      url: config.api.url + _.ifFunction(model.url) ? model.url() : model.url
    });
    backboneSync(method, model, options);
  }

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
