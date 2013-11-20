// DESTROYS CERTAIN FOLDERS
module.exports = {
  tmp: {['.tmp']},
  dist: {['<%= dist %>']},
  postBuild: {[
    '<%= dist %>/js/vendor',
    '<%= dist %>/js/primatives',
    '<%= dist %>/js/templates',
    '<%= dist %>/css/vendor'
  ]}
}