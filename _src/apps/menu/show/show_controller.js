require('app');
require('apps/menu/show/views/menu');
require('apps/menu/show/views/menu_link');

return Moonrakr.module('Menu.Show', function(Show){

  Show.Controller = {

    showMenu:function(){

      this.collection = Moonrakr.request('header:entities');
      this.view = new Show.Menu({collection: this.collection});

      this.attachHandlers();

      Moonrakr.headerRegion.show( this.view );

      $(function() {                                //run when the DOM is ready
        $(".menu-plus-wrapper").click(function() {          //use a class, since your ID gets mangled
          $(".el-icon-plus-sign").toggleClass("menu-plus-press");   //add the class to the clicked element
          $(".menu-sub").toggleClass("menu-sub-press");
        });
      });

    },
    attachHandlers:function(){

      this.view.on('logo:clicked', function(){
        Moonrakr.trigger('posts:list');
      });

      this.view.on('itemview:navigate', function(childView, model){
        console.log('q;ejrbn');
        var trigger = model.get('navigationTrigger');
        // var navString = model.get('navigationString') || null;
        Moonrakr.trigger( trigger );
      });

    }
  };

});