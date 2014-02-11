require('app');
var FooterView = require('apps/footer/show/views/footer');

return Moonrakr.module('Footer.Show', function(Show){

  Show.Controller = {

    showFooter:function(){

      // this.view = new Show.Footer({collection: this.collection});

      this.view = new FooterView({collection: this.collection});

      this.attachHandlers();

      Moonrakr.footerRegion.show( this.view );

    },
    attachHandlers:function(){

      this.view.on('logo:clicked', function(){
        Moonrakr.trigger('posts:list');
      });

      this.view.on('about:clicked', function(){
        Moonrakr.trigger('post:about');
      });

      this.view.on('privacy:clicked', function(){
        Moonrakr.trigger('post:privacy');
      });

      this.view.on('sponsorship:clicked', function(){
        console.log('spon');
        Moonrakr.trigger('post:sponsorship');
      });

    }
  };

});