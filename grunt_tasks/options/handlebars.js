// This task compiles all hanldbars templates with the extension .hbs to
// .js files for faster consumption and smaller handlebars.runtime library
module.exports = {
  dev: {
    options: {
      // namespace: 'JST', // this is the default
      amd: true            // dont really know how this works yet :)
    },
    files: [{
      expand: true,
      flatten: true,
      cwd: 'app/',
      src: ['**/*.hbs'],
      dest: '.tmp/js/templates/',
      ext: '.js'
    }]
  },
  dist: {
    options: {
      // namespace: 'JST', // this is the default
      amd: true            // dont really know how this works yet :)
    },
    files: [{
      expand: true,
      flatten: true,
      cwd: 'app/',
      src: ['**/*.hbs'],
      dest: '<%= sacrum.dist %>/js/templates/',
      ext: '.js'
    }]
  }
}