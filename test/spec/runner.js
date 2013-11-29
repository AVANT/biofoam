define([
  // test files go here
  'space/apps/app.spec.js'

  ], function(){
    'use strict';

    window.console = window.console || function(){};
    window.notrack = true;
    window.mocha.run();

});