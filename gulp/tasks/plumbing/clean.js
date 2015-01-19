var taskname = require('path').basename(__filename, '.js');
var config   = require('../../config')[taskname];
var gulp     = require('gulp');
var del      = require('del');

gulp.task( taskname, function (cb) {
  del( config.delete, cb);
});
