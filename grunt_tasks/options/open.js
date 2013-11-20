// OPENS UP YOUR DEFAULT BROSWER WITH A NEW PAGE AT THIS PATH
module.exports = {
  server: {
    path: 'http://localhost:<%= connect.options.port %>'
  },
  testBrowser: {
    path: 'http://localhost:<%= connect.testBrowser.options.port %>/_SpecRunner.html'
  },
  jsdocs: {
    path: 'http://localhost:<%= connect.options.port %>/jsdocs/index.html'
  }
}