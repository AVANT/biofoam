// RUN TASKS CONCURRENTLY
module.exports = {
  devCompile: {
    tasks: [
      // 'sass:dev',
      'compass:dev',
      'handlebars:dev'
    ]
  },
  devCopy: {
    tasks: [
      'copy:assets2tmp',
      'copy:scripts2tmp',
      'copy:templates2tmp',
      'copy:styles2tmp',
      'copy:vendor2tmp'
    ]
  },
  distCompile: {
    tasks: [
      'sass:dist',
      // 'compass:dist',
      'handlebars:dev'
    ]
  },
  distCopy: {
    tasks: [
      'copy:assets2dist',
      'copy:scripts2dist',
      'copy:styles2dist',
      'copy:vendor2dist'
    ]
  }
}