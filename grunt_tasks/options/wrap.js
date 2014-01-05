module.exports = {
  dev: {
    cwd: 'app/',
    expand: true,
    src: ['apps/**/*.js'],
    dest: '<%= tmp %>/js',
    options: {
      wrapper: ['define(function(require){\n', '\n})']
    }
  }
};