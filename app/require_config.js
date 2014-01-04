require.config({
  paths:{

      //////////
     // CORE //
    //////////
    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    handlebars: 'vendor/handlebars',
    backbone: 'vendor/backbone',
    marionette: 'vendor/backbone.marionette',
    text: 'vendor/text',
    'backbone.stickit': 'vendor/backbone.stickit',

      //////////////////
     // SUPPLEMENTAL //
    //////////////////
    'backbone.localstorage': 'vendor/backbone.localstorage',
    spinner: 'vendor/spin',
    'backbone.syphon': 'vendor/backbone.syphon',
    'backbone.picky': 'vendor/backbone.picky',
    bootstrap: 'vendor/bootstrap',
    bootbox: 'vendor/bootbox',

      /////////
     // CMS //
    /////////
    'jquery.redactor': 'vendor/redactor',
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
    'backbone.stickit': {
      deps: ['jquery', 'underscore', 'backbone']
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
