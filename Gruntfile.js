'use strict';

// Utility Functions

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}

module.exports = function (grunt){

  // load all the grunt task plugins
  require('matchdep').filterDev('grunt-*').forEach(function(str){
    if (str !== 'grunt-template-jasmine-requirejs' ){  // if you dont do this it'll complain about loading up the template
      grunt.loadNpmTasks(str);
    }
  });

  var config = {
      pkg: grunt.file.readJSON('package.json'),
      app: 'app',
      dist: 'dist'
    };

  // load in all the task options
  grunt.util._.extend(config, loadConfig('./grunt_tasks/options/'));

  // configure
  grunt.initConfig( config );

  // load in all the custom tasks
  grunt.loadTasks('grunt_tasks');

};
