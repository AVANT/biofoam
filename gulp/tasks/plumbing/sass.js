var taskname = require('path').basename(__filename, '.js');
var config   = require('../../config')[taskname];
var gulp     = require('gulp');
var sass     = require('gulp-sass');

gulp.task( taskname, function () {

  return gulp.src( config.src )
    .pipe( sass() )
    .pipe( gulp.dest( config.dest ) );

});
