var gulp        = require('gulp');
var taskname    = require('path').basename(__filename, '.js');
var runSequence = require('run-sequence');

gulp.task( taskname, [], function (cb) {

  runSequence(['sass', 'copy', 'wrap'], cb);

});

// consider alt using command flags
gulp.task( taskname + ':prod', ['build'], function (cb) {

  runSequence('requirejs', cb);

});
