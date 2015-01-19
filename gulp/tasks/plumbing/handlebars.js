var taskname   = require('path').basename(__filename, '.js');
var config     = require('../../config')[taskname];
var gulp       = require('gulp');
var handlebars = require('gulp-handlebars');

// NOT CONFIGURED YET

gulp.task( taskname, function () {

  return gulp.src( config.src )
    .pipe( handlebars() )
    .pipe( gulp.dest( config.dest ) );

});
