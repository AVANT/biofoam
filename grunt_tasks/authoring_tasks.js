module.exports = function(grunt) {

    /////////////////////
   // AUTHORING TASKS //
  /////////////////////


  grunt.registerTask('jsdocs:server',[
    'yuidoc:compile',
    'connect:jsdocs',
    'watch'
  ]);

  grunt.registerTask('styleguide:server',[
    'dev',
    'connect:styleguide',
    'watch'
  ]);


  grunt.registerTask('dev',[
    'clean:tmp',
    'concurrent:devCompile',
    'concurrent:devCopy',
    // 'test',
  ]);

  grunt.registerTask('dev:server',[
    'dev',
    'connect:tmp',
    'watch'
  ]);

  grunt.registerTask('default',['dev:server']);

  grunt.registerTask('test',[
    // add jshint somewhere
    'concurrent:devCopy',
    'connect:test',
    'jasmine:test'
  ]);

  grunt.registerTask('test:server',[
    'concurrent:devCopy',
    'jasmine:test:build',
    'connect:testBrowser',
    'open:testBrowser',
    'watch'                       // note: livereload untested here
  ]);

  grunt.registerTask('build',[
    'clean:dist',               // clear previous build
    'concurrent:distCompile',   // compile all files
    'concurrent:distCopy',      // copy all targeted files to sacrum.dist
    'imagemin:dist',            // image conversion
    'useminPrepare',            // get a handle on all references before names change
    'test',                     // run all tests
    'requirejs:dist',           // run require optimization
    'rev',                      // add a unique hash to the name of every static file
    'usemin',                   // replace references to static files with new names
    'clean:postBuild'           // clear out unwanted folders left over from optimization
  ]);


  grunt.registerTask('build:server',[
    'build',
    'connect:build',
    'open:server',
    'watch:build'                // note: no livereload support here
  ]);

  grunt.registerTask('deploy', [
    'shell:deploy'
  ]);

};