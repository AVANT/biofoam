require.config({
  paths:{

      //////////
     // CORE //
    //////////
    jquery: 'vendor/jquery-2.0.3',
    underscore: 'vendor/underscore-1.4.4',
    handlebars: 'vendor/handlebars-1.0.0',
    backbone: 'vendor/backbone-1.0.0',
    marionette: 'vendor/marionette-1.0.3',
    text: 'vendor/text-2.0.7',

      //////////////////
     // SUPPLEMENTAL //
    //////////////////
    'backbone.localstorage': 'vendor/backbone.localstorage-1.1.6',
    spinner: 'vendor/spin-1.3.2',
    'backbone.syphon': 'vendor/backbone.syphon-0.4.1',
    'backbone.picky': 'vendor/backbone.picky-0.2.0',
    bootstrap: 'vendor/bootstrap-3.0.0',
    bootbox: 'vendor/bootbox-4.1.0',

      /////////
     // CMS //
    /////////
    'jquery.redactor': 'vendor/redactor-9.1.5',
    'jquery.jcrop': 'vendor/jquery.Jcrop',
    loadImage: 'vendor/load-image.min',
    loadImageExifMap : 'vendor/load-image-exif-map',
    loadImageExif: 'vendor/load-image-exif',
    loadImageIos: 'vendor/load-image-ios',
    loadImageMeta: 'vendor/load-image-meta',
    loadImageOrientation: 'vendor/load-image-orientation',
    loadImage: 'vendor/load-image'

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
    'backbone.picky': {
      deps: ['backbone']
    },
    'jquery.redactor': {
      deps: ['jquery']
    },
    'jquery.jcrop': {
      deps: ['jquery']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'bootbox': {
      deps: ['jquery', 'bootstrap']
    }
  }
});
