var src          = '_src';
var dest         = '_dist';
var venderLoader = 'bower_components';

module.exports = {
  src: src,
  dest: dest,

  sass: {
    src: src + '/styles/main.scss',
    dest: dest + '/css'
  },

  // TODO: figure out how to remove all the combined scripts
  requirejs: {
    rjs: {
      baseUrl: dest + '/js',
      optimize: 'none',
      removeCombined: true, // doesnt work
      mainConfigFile: dest + '/js/require_config.production.js',
      findNestedDependencies: true,
      name: 'main',
      out: 'main.optimized.js'
    },
    dest: dest + '/js'
  },

  // TODO: implement handlebars pre-rendering
  handlebars: {}, // NOT USED YET

  wrap: {
    src: src + '/apps/**/*.js',
    wrapText: 'define(function(require){\n <%= contents %> \n});',
    dest: dest + '/js/apps'
  },

  copy: [
    { // copy over assets
      src: src + '/assets/**/*',
      dest: dest
    },
    { // copy over js files at src root
      src: src + '/*.js',
      dest: dest + '/js'
    },
    { // copy over templates
      src: src + '/apps/**/*.html',
      dest: dest + '/js/apps/'
    },
    // TODO: figure out a better way to handle these
    { // copy over vender scripts
      src: [
        // from bower
        venderLoader + '/backbone/backbone.js',
        venderLoader + '/backbone-validation/dist/backbone-validation-amd.js',
        venderLoader + '/backbone.localstorage/backbone.localstorage.js',
        venderLoader + '/backbone.picky/lib/backbone.picky.js',
        venderLoader + '/backbone.stickit/backbone.stickit.js',
        venderLoader + '/backbone.syphon/backbone.syphon.js',
        venderLoader + '/blueimp-canvas-to-blob/js/canvas-to-blob.js',
        venderLoader + '/blueimp-load-image/js/*.js',
        venderLoader + '/bootstrap/dist/js/bootstrap.js',
        venderLoader + '/bootbox/bootbox.js',
        venderLoader + '/jquery-fittext.js/jquery.fittext.js',
        venderLoader + '/handlebars/handlebars.js',
        venderLoader + '/jcrop/js/jquery.Jcrop.js',
        venderLoader + '/jquery/jquery.js',
        venderLoader + '/marionette/lib/backbone.marionette.js',
        venderLoader + '/moment/moment.js',
        venderLoader + '/requirejs/require.js',
        venderLoader + '/salvattore/dist/salvattore.js',
        venderLoader + '/slick-carousel/slick/slick.min.js',
        venderLoader + '/spinjs/spin.js',
        venderLoader + '/text/text.js',
        venderLoader + '/underscore/underscore.js',
        // outside of bower
        'vendor/Redactor/redactor/redactor.js',
        'vendor/Masonry/masonry.pkgd.js',
      ],
      dest: dest + '/js/vendor'
    }
  ],

  browser_sync: {
    baseDir: [ dest ],
    modRewrite: '^[^\\.]*$ /index.html [L]',
    files: [ dest + '/**' ]
  },

  clean: {
    delete: [ dest + '/**' ]
  }
};
