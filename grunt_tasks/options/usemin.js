// USEMIN updates index.html file with optimized/minified file names
// v2 should support the ability to wire up almond on build
module.exports = {
  html: ['<%= sacrum.dist %>/index.html'],
  css: ['<%= sacrum.dist %>/css/main.css'],
  options: {
    dirs: ['<%= sacrum.dist %>']
  }
}