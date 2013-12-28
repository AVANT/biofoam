define([
  // TEST FILES

  // app
  'spec/app/app.spec.js',

  // entities
  'spec/app/apps/entities/_entities.spec.js',

  // post app
  'spec/app/apps/posts/_posts.spec.js'

  ], function(){
    'use strict';

    window.console = window.console || function(){};
    window.notrack = true;
    window.mocha.run();

});