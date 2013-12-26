define([
  // TEST FILES

  // app
  'spec/app/app.spec.js',

  // entities
  'spec/app/apps/entities/posts.spec.js'

  ], function(){
    'use strict';

    window.console = window.console || function(){};
    window.notrack = true;
    window.mocha.run();

});