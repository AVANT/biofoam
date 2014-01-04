module.exports = {
  dist: {
    options: {
      baseUrl: '<%= dist %>/js',
      optimize: 'uglify',
      preserveLicenseComments: true,
      useStrict: false,
      // wrap: true,

      mainConfigFile: '<%= dist %>/js/require_config.js',
      removeCombined: true,
      findNestedDependencies: true,
      name: 'main',
      out: '<%= dist %>/js/main.optimized.js',
      waitSeconds: 7,
      logLevel: 0
    }
  }
};