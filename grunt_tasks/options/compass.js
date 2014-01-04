// COMPILE COMPASS FILES
module.exports = {
  options: {
    sassDir: '<%= app %>/styles',
    relativeAssets: true,
    debugInfo: false
    // specify: ['<%= app %>/styles/main.scss']
  },
  dev: {
    options: {
      cssDir: '.tmp/css'
    }
  },
  dist: {
    options: {
      cssDir: '<%= dist %>/css'
    }
  }
}