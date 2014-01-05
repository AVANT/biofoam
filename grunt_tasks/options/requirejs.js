// ALL OPTIONS EXPLAINED HERE: https://github.com/jrburke/r.js/blob/master/build/example.build.js

module.exports = {
  dev: {
    options:{
      optimize: 'none',
      // appDir: '<%= app %>/js',
      baseUrl: '<%= app %>',
      // appDir: '<%= tmp %>/js',
      dir: '<%= tmp %>/js',
      wrap: {
        start: '(function(require) {',
        end: '}());'
      },
      mainConfigFile: '<%= app %>/require_config.js',
      findNestedDependencies: true,
      name: 'main',
    }
  },
  dist: {
    options: {
      baseUrl: '<%= dist %>/js',
      // optimize: 'uglify',
      // preserveLicenseComments: true,
      // useStrict: false,
      // inlineText: true,
      removeCombined: true,

      mainConfigFile: '<%= dist %>/js/require_config.js',
      findNestedDependencies: true,
      name: 'main',
      out: '<%= dist %>/js/main.optimized.js',
      // waitSeconds: 3,
      // logLevel: 0
    }
  }
};