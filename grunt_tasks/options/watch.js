module.exports = {
  options: {
    livereload: true,
  },
  openServer: {
    files: ['<%= sacrum.app %>/assets/index.html'],
    tasks: ['open:server'],
    options: {
      atBegin: true,
    }
  },
  // sass: {
  //   files: ['<%= sacrum.app %>/**/*.scss'],
  //   tasks: ['sass:dev']
  // },
  compass: {
    files: ['<%= sacrum.app %>/styles/**/*.scss'],
    tasks: ['compass:dev']
  },
  copyAssets: {
    files: ['<%= sacrum.app %>/assets/**/*.{png,jpg,jepg,gif,webp,svg,html,eot,ttf,woff}'],
    tasks: ['copy:assets2tmp']
  },
  copyScripts: {
    files: ['<%= sacrum.app %>/**/*.js'],
    tasks: ['copy:scripts2tmp']
  },
  copyTemplates:{
    files: ['<%= sacrum.app %/apps/**/*.html>'],
    tasks: ['copy:templates2tmp']
  },
  copyStyles: {
    files: ['<%= sacrum.app %>/**/*.css'],
    tasks: ['copy:styles2tmp']
  },
  copyVendor: {
    files: ['vendor/**/*.js', 'vendor/**/*.css', 'vendor/**/*.scss'],
    tasks: ['copy:vendor2tmp']
  },
  jasmine: {
    files: ['<%= sacrum.app %>/scripts/**/*.js', 'test/spec/**/*.js'],
    tasks: ['test']
  },
  // dummy task to keep the server running on build:server
  build: {
    files: ['<%= sacrum.app %>/*.html'],
    options: {
      livereload: false
    }
  }
}