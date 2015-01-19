var taskname = require('path').basename(__filename, '.js');
var config   = require('../../config')[taskname];
var gulp     = require('gulp');
var rjs      = require('gulp-requirejs');

gulp.task( taskname, function () {

  return rjs( config.rjs )
    .pipe( gulp.dest( config.dest ) );

});
