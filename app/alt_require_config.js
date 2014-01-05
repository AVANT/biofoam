require.config({
  paths:{

    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    handlebars: '../bower_components/handlebars/handlebars',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    text: '../bower_components/text/text',
    'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
    'backbone.validation': '../bower_components/backbone-validation/dist/backbone-validation-amd',

    'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localstorage',
    spinner: '../bower_components/spinjs/spin',
    'backbone.syphon': '../bower_components/backbone.syphon/lib/amd/backbone.syphon',
    'backbone.picky': '../bower_components/backbone.picky/lib/amd/backbone.picky',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    bootbox: '../bower_components/bootbox/bootbox',

    'jquery.redactor': '../vendor/Redactor/redactor/redactor',
    'jquery.jcrop': '../bower_components/jcrop/js/jquery.Jcrop',
    loadImageMin: '../bower_components/blueimp-load-image/js/load-image.min',
    loadImageExifMap : '../bower_components/blueimp-load-image/js/load-image-exif-map',
    loadImageExif: '../bower_components/blueimp-load-image/js/load-image-exif',
    loadImageIos: '../bower_components/blueimp-load-image/js/load-image-ios',
    loadImageMeta: '../bower_components/blueimp-load-image/js/load-image-meta',
    loadImageOrientation: '../bower_components/blueimp-load-image/js/load-image-orientation',
    loadImage: '../bower_components/blueimp-load-image/js/load-image',

    canvasToBlob: '../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob',

  },
  shim: {
    underscore: {
      exports: '_'
    },
    handlebars: {
      deps: ['text'],
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
