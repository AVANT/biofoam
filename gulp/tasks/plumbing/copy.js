var taskname = require('path').basename(__filename, '.js');
var config   = require('../../config')[taskname];
var gulp     = require('gulp');
var map      = require('lodash.map');
var merge    = require('merge-stream');

gulp.task( taskname, function () {

  var copyThis = function ( config ) {
    return gulp.src( config.src )
      .pipe( gulp.dest( config.dest ) );
  };

  var streams = map(config, copyThis);

  return merge(streams);

});
