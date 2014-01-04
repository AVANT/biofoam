// DESTROYS CERTAIN FOLDERS
module.exports = {
  tmp: {
    src: ['.tmp']
  },
  dist: {
    src: ['<%= dist %>']
  },
  postBuild: {
    src: [
      '!<%= dist %>/js/main.optimized.js',
      // '<%= dist %>/js/**/*',
    ]
  }
};