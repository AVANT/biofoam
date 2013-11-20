// COMPILE SASS FILES - .scss only
module.exports = {
  options: {
    // includePaths: '<%= app %>/styles/'
  },
  dev: {
    options:{
      outputStyle: 'expanded',
      sourceComments: 'normal'
    },
    files: {
      '.tmp/css/main.css': '<%= app %>/styles/main.scss',
      '.tmp/css/vendor.css': '<%= app %>/styles/vendor/vendor.scss'
    }
  },
  dist: {
    options: {
      cssDir: '<%= dist %>/css'
    }
  }
}