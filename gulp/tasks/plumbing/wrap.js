var taskname = require('path').basename(__filename, '.js');
var config   = require('../../config')[taskname];
var gulp     = require('gulp');
var wrap     = require('gulp-wrap');

gulp.task( taskname, function () {

  return gulp.src( config.src )
    .pipe( wrap( config.wrapText ) )
    .pipe( gulp.dest( config.dest ) );

});
