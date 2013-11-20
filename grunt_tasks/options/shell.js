// This task can run commands thru a shell (bash)
module.exports = {
  generate_js_docs:{
    options: {
      stdout: true
    },
    command: './node_modules/.bin/docco-husky app'
  },
  deploy: {
    command: function(){
      var env = grunt.option( "env" );
      var server_target = "dev-server-name:/path/to/site/"
      if ( env === "production" ){
        server_target = "production-server-name:/path/to/site/"
      }
      grunt.log.writeln( "deploying to " + env + ": " + server_target );
      return "rsync -rvc --rsync-path='umask 002 && rsync' dist/" +  server_target;
    }
  }
}