// COMPILE SASS FILES - .scss only
module.exports = {
  options: {
    // includePaths: '<%= app %>/styles/'
  },
  dev: {
    options: {
      outputStyle: 'expanded',
      sourceComments: 'none'
    },
    files: {
      '.tmp/css/main.css': '<%= app %>/styles/main.scss'
      // '.tmp/css/vendor.css': '<%= app %>/styles/vendor/vendor.scss'
    }
  },
  dist: {
    options: {
      // outputStyle: 'expanded',
      // sourceComments: 'none'
    },
    files: {
      'dist/css/main.css': '<%= app %>/styles/main.scss'
    }
  }
};
