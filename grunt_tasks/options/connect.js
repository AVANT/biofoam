var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = {
  options: {
    port: 8000,
    hostname: 'localhost'
  },
  jsdocs: {
    options:{
      middleware: function (connect) {
        return [
          mountFolder(connect, 'jsdocs')
        ];
      }
    }
  },
  styleguide: {
    options:{
      middleware: function (connect) {
        return [
          mountFolder(connect, 'styleguide'),
          mountFolder(connect, '.tmp/css/')
        ];
      }
    }
  },
  tmp: {
    options: {
      port: 8000,
      hostname: 'localhost',
      middleware: function (connect) {
        return [
          mountFolder(connect, '.tmp')
        ];
      }
    }
  },
  build: {
    options: {
      port: 8000,
      hostname: 'localhost',
      middleware: function (connect) {
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
  testBrowser: {
    options: {
      port: 8002,
      middleware: function (connect) {
        return [
          mountFolder(connect, './')
        ];
      }
    }
  }
  }