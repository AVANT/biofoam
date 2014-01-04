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
      '<%= dist %>/js/vendor',
      '<%= dist %>/js/primatives',
      '<%= dist %>/js/templates',
      '<%= dist %>/css/vendor'
    ]
  }
}