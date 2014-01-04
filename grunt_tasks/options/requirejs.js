module.exports = {
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