module.exports = {
  dist: {
    options: {
      baseUrl: '<%= sacrum.dist %>/js',
      optimize: 'uglify',
      preserveLicenseComments: true,
      useStrict: false,
      wrap: true,
    mainConfigFile: '<%= sacrum.dist %>/js/requireConfig.js',
      removeCombined: true,
      findNestedDependencies: true,
      name: 'main',
      out: '<%= sacrum.dist %>/js/main.optimized.js',
      waitSeconds: 7,
      logLevel: 0
    }
  }
}