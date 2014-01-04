// USEMIN updates index.html file with optimized/minified file names
// v2 should support the ability to wire up almond on build
module.exports = {
  html: ['<%= dist %>/index.html'],
  css: ['<%= dist %>/css/main.css'],
  options: {
    dirs: ['<;%= dist %>']
  }
};