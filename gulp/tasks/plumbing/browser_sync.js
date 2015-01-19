var taskname    = require('path').basename(__filename, '.js');
var config      = require('../../config')[taskname];
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var modRewrite  = require('connect-modrewrite');

gulp.task( taskname, ['build'], function () {
  browserSync({
    server: {
      baseDir: config.baseDir,
      middleware: [
        modRewrite([
          config.modRewrite
        ])
      ]
    },
    files: config.files
  });
});
