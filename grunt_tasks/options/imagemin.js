// This tasks converts all non-progressive jpegs to progressive format this
// is considered a modern browser best practice http://blog.patrickmeenan.com/2013/06/progressive-jpegs-ftw.html
module.exports = {
  dist: {
    options: {
      optimizationLevel: 0,
      progressive: true
    },
    files: [{
      expand: true,
      cwd: '<%= sacrum.app %>/assets/',
      src: '**/*.jpg',
      dest: '<%= sacrum.dist %>'
    }]
  }
}