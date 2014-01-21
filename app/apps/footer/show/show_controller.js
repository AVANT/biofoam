require('app');
require('apps/footer/show/views/footer');

return Moonrakr.module('Footer.Show', function(Show){

  Show.Controller = {

    showFooter:function(){

      // this.collection = Moonrakr.request('header:entities');
      this.view = new Show.Footer({collection: this.collection});

      this.attachHandlers();

      Moonrakr.footerRegion.show( this.view );

    },
    attachHandlers:function(){

      this.view.on('logo:clicked', function(){
        Moonrakr.trigger('posts:list');
      });

    }
  };

});