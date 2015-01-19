// OPENS UP YOUR DEFAULT BROSWER WITH A NEW PAGE AT THIS PATH
module.exports = {
  server: {
    path: 'http://localhost:<%= connect.options.port %>'
  },
  testMocha: {
    path: 'http://localhost:<%= connect.testMocha.options.port %>/test/index.html'
  },
  testBrowser: {
    path: 'http://localhost:<%= connect.testBrowser.options.port %>/_SpecRunner.html'
  }
}
