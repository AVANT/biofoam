define([
  // TEST FILES

  // app
  'spec/app/app.spec.js',

  // entities
  // 'spec/app/apps/entities/_entities.spec.js',

  // post app
  // 'spec/app/apps/posts/_posts.spec.js',

  // menu app
  // 'spec/app/apps/menu/_menu.spec.js'

  ], function(){
    'use strict';

    window.console = window.console || function(){};
    window.notrack = true;

    // handling for running in the browser window or
    // the phantomjs window
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { window.mocha.run(); }

});