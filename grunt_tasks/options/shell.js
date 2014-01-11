// This task can run commands thru a shell (bash)
module.exports = {

  deployDev: {
    command: function(){
      // var env = grunt.option( "env" );
      // if ( env === "production" ){
      //   server_target = "production-server-name:/path/to/site/";
      // }
      var server_target = 'dev-server-name:/path/to/site/';
      // grunt.log.writeln( 'deploying to dev: ' + server_target );
      // return "rsync -rvc --rsync-path='umask 002 && rsync' dist/" +  server_target;
      return 'ls';
    }
  }

};