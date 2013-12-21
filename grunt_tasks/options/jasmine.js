// RUNS JASMINE SPECS IN HEADLESS PHANTOM
module.exports = {
  test: {
    // source of all the javascripts files to test (the app's files)
    src: ['.tmp/js/**/*.js', '!.tmp/js/vendor/**'],
    options: {
      // test from this ad hoc server // phantomjs always times out
      host: 'http://localhost:<%= connect.test.options.port %>',
      // host: 'http://localhost:9000',
      junitPath: './',

      // all the testing specs
      specs: 'test/spec/**/*Spec.js',
      helpers: ['test/helpers/**/*.js', 'test/lib/jasmine-jquery.js'],
      // option to keep _SpecRunner.html
      keepRunner: false,

      template: require('grunt-template-jasmine-requirejs'),
      templateOptions: {
        requireConfigFile: '.tmp/js/requireConfig.js',
        requireConfig : {
          baseUrl: '.tmp/js/'
        }
      }
    }
  }
}