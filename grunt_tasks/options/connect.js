var modRewrite = require('connect-modrewrite');

var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = {
  options: {
    port: 8000,
    hostname: 'localhost'
  },
  tmp: {
    options: {
      port: 8000,
      hostname: 'localhost',
      middleware: function(connect) {
        return [
          modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']),
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'bower_components'),
          mountFolder(connect, 'prototype')
        ];
      }
    }
  },
  build: {
    options: {
      port: 8000,
      hostname: 'localhost',
      middleware: function(connect) {
        return [
          mountFolder(connect, 'dist')
        ];
      }
    }
  },
  test: {
    options: {
      port: 8001
    }
  },
  testMocha: {
    options: {
      port: 8002,
      middleware: function(connect) {
        return [
          // need to include root to get relative refernece across test/ and .tmp/
          mountFolder(connect, '.'),
        ];
      }
    }
  },
  testBrowser: {
    options: {
      port: 8002,
      middleware: function(connect) {
        return [
          mountFolder(connect, './')
        ];
      }
    }
  }
};
