// DESTROYS CERTAIN FOLDERS
module.exports = {
  tmp: '.tmp',
  dist: '<%= sacrum.dist %>',
  postBuild: [
    '<%= sacrum.dist %>/js/vendor',
    '<%= sacrum.dist %>/js/primatives',
    '<%= sacrum.dist %>/js/templates',
    '<%= sacrum.dist %>/css/vendor'
  ]
}