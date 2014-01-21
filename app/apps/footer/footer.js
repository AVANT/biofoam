require('app');
require('apps/footer/show/show_controller');

return Moonrakr.module('Footer', function(Footer){
  this.startWithParent = true;

  var API = {
    showFooter: function(){
      Footer.Show.Controller.showFooter();
    },
  };

  Footer.on('start', function(){
    API.showFooter();
  });

});