module.exports = {
  options: {
    livereload: true,
  },
  openServer: {
    files: ['<%= app %>/assets/index.html'],
    tasks: ['open:server'],
    options: {
      atBegin: true,
    }
  },
  sass: {
    files: ['<%= app %>/**/*.scss'],
    tasks: ['sass:dev']
  },
  // compass: {
  //   files: ['<%= app %>/styles/**/*.scss'],
  //   tasks: ['compass:dev']
  // },
  copyAssets: {
    files: ['<%= app %>/assets/**/*.{png,jpg,jepg,gif,webp,svg,html,eot,ttf,woff}'],
    tasks: ['copy:assets2tmp']
  },
  copyScripts: {
    files: ['<%= app %>/**/*.js'],
    tasks: ['copy:scripts2tmp']
  },
  copyTemplates:{
    files: ['<%= app %/apps/**/*.html>'],
    tasks: ['copy:templates2tmp']
  },
  copyStyles: {
    files: ['<%= app %>/**/*.css'],
    tasks: ['copy:styles2tmp']
  },
  copyVendor: {
    files: ['vendor/**/*.js', 'vendor/**/*.css', 'vendor/**/*.scss'],
    tasks: ['copy:vendor2tmp']
  },
  jasmine: {
    files: ['<%= app %>/scripts/**/*.js', 'test/spec/**/*.js'],
    tasks: ['test']
  },
  // dummy task to keep the server running on build:server
  build: {
    files: ['<%= app %>/*.html'],
    options: {
      livereload: false
    }
  }
}