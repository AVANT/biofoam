require.config({
  paths:{
    jquery: 'vendor/jquery-1.10.2',
    underscore: 'vendor/underscore-1.4.4',
    handlebars: 'vendor/handlebars-1.0.0',
    backbone: 'vendor/backbone-1.0.0',
    marionette: 'vendor/marionette-1.0.3',
    text: 'vendor/text-2.0.7',
    'backbone.localstorage': 'vendor/backbone.localstorage-1.1.6',
    spinner: 'vendor/spin-1.3.2',
    'backbone.syphon': 'vendor/backbone.syphon-0.4.1',
    'backbone.picky': 'vendor/backbone.picky-0.2.0'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },
    'backbone.picky':{
      deps: ['backbone']
    }
  }
});
