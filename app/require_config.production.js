require.config({
  paths:{

    config: 'config.production',

    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    handlebars: 'vendor/handlebars',
    backbone: 'vendor/backbone',
    marionette: 'vendor/backbone.marionette',
    text: 'vendor/text',
    'backbone.stickit': 'vendor/backbone.stickit',
    'backbone.validation': 'vendor/backbone-validation-amd',

    'backbone.localstorage': 'vendor/backbone.localstorage',
    spinner: 'vendor/spin',
    'backbone.syphon': 'vendor/backbone.syphon',
    'backbone.picky': 'vendor/backbone.picky',
    bootstrap: 'vendor/bootstrap',
    bootbox: 'vendor/bootbox',

    salvattore: 'vendor/salvattore',
    // masonry: 'vendor/masonry.pkgd',
    moment: 'vendor/moment',
    fittext: 'vendor/jquery.fittext',

    'jquery.redactor': 'vendor/redactor',
    'jquery.jcrop': 'vendor/jquery.Jcrop',
    loadImageMin: 'vendor/load-image.min',
    loadImageExifMap : 'vendor/load-image-exif-map',
    loadImageExif: 'vendor/load-image-exif',
    loadImageIos: 'vendor/load-image-ios',
    loadImageMeta: 'vendor/load-image-meta',
    loadImageOrientation: 'vendor/load-image-orientation',
    loadImage: 'vendor/load-image',

    canvasToBlob: 'vendor/canvas-to-blob',

  },
  shim: {
    underscore: {
      exports: '_'
    },
    handlebars: {
      deps: ['text'],
      exports: 'Handlebars'
    },
    masonry:{
      exports: 'Masonry'
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
    },
    fittext: {
      deps: ['jquery']
    }
  }
});
