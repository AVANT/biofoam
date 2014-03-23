define(function(require){

  var Marionette = require('marionette');
  var config = require('config');

  window.Moonrakr = new Marionette.Application();
  // var Moonrakr = new Marionette.Application();

  Moonrakr.Config = config;

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

  Moonrakr.on('initialize:after', function(){
    console.log('Moonrakr started');
    if(Backbone.history){
      Backbone.history.start({pushState: true});

      if (this.getCurrentRoute() === ''){
        Moonrakr.trigger('posts:list');
      }
    }
    // async load facebook sdk
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '624628847586856',
        status     : true,
        xfbml      : true
      });
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
