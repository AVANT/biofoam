module.exports = {
  dev: {
    cwd: 'app/',
    expand: true,
    src: ['apps/**/*.js'],
    dest: '<%= tmp %>/js',
    options: {
      wrapper: ['define(function(require){\n', '\n})']
    }
  },
  dist: {
    cwd: 'app/',
    expand: true,
    src: ['apps/**/*.js'],
    dest: '<%= dist %>/js',
    options: {
      wrapper: ['define(function(require){\n', '\n})']
    }
  }
};