var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = {
  options: {
    port: 8000,
    hostname: 'localhost'
  },
  jsdocs: {
    options: {
      middleware: function(connect) {
        return [
          mountFolder(connect, 'jsdocs')
        ];
      }
    }
  },
  styleguide: {
    options: {
      port: 8003,
      middleware: function(connect) {
        return [
          mountFolder(connect, 'bower_components'),
          mountFolder(connect, 'styleguide'),
          mountFolder(connect, '.tmp/css/'),
          mountFolder(connect, '.tmp/'),
        ];
      }
    }
  },
  tmp: {
    options: {
      port: 8000,
      hostname: 'localhost',
      middleware: function(connect) {
        return [
          mountFolder(connect, '.tmp'),
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
}
