define([
  // test files go here

  // APP
  'spec/app/app.spec.js',

  // ENITIES
  'spec/app/apps/entities/posts.spec.js'

  ], function(){
    'use strict';

    window.console = window.console || function(){};
    window.notrack = true;
    window.mocha.run();

});