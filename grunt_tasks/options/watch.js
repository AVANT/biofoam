module.exports = {
  options: {
    livereload: true,
  },
  openServer: {
    files: ['<%= app %>/assets/index.html'],
    tasks: ['open:server'],
    options: {
      // atBegin: true,
      atBegin: false,
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
  yuidoc: {
    files: ['<%= app %>/**/*.js'],
    tasks: ['yuidoc:compile'],
  },
  jsdocs: {
    files: ['jsdocs/files**/*.html'],
    options: {
      livereload: true
    }
  },
  copyAssets: {
    files: ['<%= app %>/assets/**/*.{png,jpg,jepg,gif,webp,svg,html,eot,ttf,woff}'],
    tasks: ['copy:assets2tmp']
  },
  copyScripts: {
    files: ['<%= app %>/**/*.js'],
    tasks: ['copy:scripts2tmp']
  },
  copyTemplates:{
    files: ['<%= app %>/apps/**/*.html'],
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
  // TODO MAKE A MOCHA WATCH TASK
  // jasmine: {
  //   files: ['<%= app %>/scripts/**/*.js', 'test/spec/**/*.js'],
  //   tasks: ['test']
  // },
  // dummy task to keep the server running on build:server
  build: {
    files: ['<%= app %>/*.html'],
    options: {
      livereload: false
    }
  }
}