define(function(require){

  var Marionette = require('marionette');
  // var config = require('config');

  window.Moonrakr = new Marionette.Application();
  // var Moonrakr = new Marionette.Application();

  var config = {
    api: 'http://www.cheruisibesares.com'
    // api: 'http://localhost:8900'
  };

  Moonrakr.Config = config;

  Moonrakr.addRegions({
    headerRegion: '#header',
    mainRegion: '#main',
    modalRegion: '#modal'
  });

  // IDEA ABOUT CLEANING THIS UP ON PAGE 212
  Moonrakr.navigate = function(route, options){
    var opts = options || (options = {});
    Backbone.history.navigate(route, opts);
  };

  Moonrakr.getCurrentRoute = function(){
    return Backbone.history.fragment;
  };

  // Moonrakr.getCurrentTrigger = function(){
  //   var routeStr = Backbone.history.fragment;
  // };

  // HACKED A FIX ON FOR LOCALSTORAGE DEVING (?)
  // extend backbone sync
  // var backboneSync = Backbone.sync;
  // Backbone.sync = function (method, model, options){
  //   options = _.extend(options, {
  //     url: Moonrakr.Config.api + _.isFunction(model.url) ? function(){ console.log( model.url() );} : model.url // HACKED
  //     // url: config.api.url + _.isFunction(model.url) ? model.url() : model.url
  //   });
  //   backboneSync(method, model, options);
  // };

  Moonrakr.on('initialize:after', function(){
    console.log('Moonrakr started');
    if(Backbone.history){
      Backbone.history.start();

      if (this.getCurrentRoute() === ''){
        Moonrakr.trigger('posts:list');
      }
    }
  });


  return Moonrakr;

});
