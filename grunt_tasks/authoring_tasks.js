module.exports = function(grunt) {

  grunt.registerTask('dev',[
    'clean:tmp',
    'concurrent:devCompile',
    'concurrent:devCopy',
    'newer:wrap:dev',
    // 'requirejs:dev',
    // 'mocha:test',
  ]);

  grunt.registerTask('dev:server',[
    'dev',
    'connect:tmp',
    'open:server',
    'watch'
  ]);

  grunt.registerTask('default',['dev:server']);

  // grunt.registerTask('test',[
  //   'dev',
  //   'connect:testMocha',
  //   'open:testMocha',
  // ]);

  grunt.registerTask('test:server',[
    'dev',
    'connect:testMocha',
    'open:testMocha',
    // 'mocha:test',
    'watch'
  ]);

  grunt.registerTask('build',[
    'clean:dist',               // clear previous build
    'concurrent:distCompile',   // compile all files
    'concurrent:distCopy',      // copy all targeted files to sacrum.dist
    'wrap:dist',
    // 'imagemin:dist',            // image conversion
    'useminPrepare',            // get a handle on all references before names change
    // 'test',                     // run all tests
    'requirejs:dist',           // run require optimization
    // 'rev',                      // add a unique hash to the name of every static file
    'usemin',                   // replace references to static files with new names
    // 'clean:postBuild'           // clear out unwanted folders left over from optimization
  ]);


  grunt.registerTask('build:server',[
    'build',
    'connect:build',
    'open:server',
    'watch:build'                // note: no livereload support here
  ]);

  grunt.registerTask('deploy', [
    'build',
    'shell:deployDev'
  ]);

  grunt.registerTask('deploy:production', [
    'build',
    'shell:deployProduction'
  ]);

};
