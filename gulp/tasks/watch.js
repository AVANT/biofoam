var taskname = require('path').basename(__filename, '.js');
var config   = require('../config');
var gulp     = require('gulp');
var map      = require('lodash.map');

gulp.task( taskname, ['browser_sync'], function () {

  var copySrc = map(config.copy, function(config){ return config.src; });

  gulp.watch( config.sass.watchGlob, ['sass'] );
  gulp.watch( copySrc, ['copy'] );
  gulp.watch( config.wrap.src, ['wrap'] );
});

