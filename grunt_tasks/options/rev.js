// This task adds unqiue content hash to the start of all targeted files
// use this task in conjuction with usemin to src new file names
module.exports = {
  options: {
    encoding: 'utf8',
    algorithm: 'sha1',
    length: 4
  },
  files: {
    src: [
      '<%= dist %>/**/*.{js,css,png,jpg}'
    ]
  }
};