define(function(require){

  var Marionette = require('marionette');
  // var config = require('config');

  window.Moonrakr = new Marionette.Application();
  // var Moonrakr = new Marionette.Application();

  Moonrakr.Config = {
    api: '/api',
    // api: 'http://192.168.33.130/api',
    postsSlug: 'media/',
    reservedSlugs: ['about', 'privacy', 'sponsorship']
  };

  Moonrakr.addRegions({
    headerRegion: '#header',
    mainRegion: '#main',
    modalRegion: '#modal',
    footerRegion: '#footer',
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
      Backbone.history.start({pushState: true});

      if (this.getCurrentRoute() === ''){
        Moonrakr.trigger('posts:list');
      }
    }
  });


  //// should be moved to a traffic controller module
  // add event should be renamed to reflect the module owner? ie. "traffic:class:add" , "traffic:class:remove"
  Moonrakr.commands.setHandler('add:body:class', function( classStr ){
    $('body').addClass( classStr );
  });

  Moonrakr.commands.setHandler('remove:body:class', function( classStr ){
    $('body').removeClass( classStr );
  });

  Moonrakr.commands.setHandler('clear:body:class', function(){
    $('body').attr('class', '');
  });
  //// refactor block

  return Moonrakr;

});
