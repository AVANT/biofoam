require('app');
require('apps/_entities/media');
require('apps/media/new/views/uploader');

return Moonrakr.module('Media.New', function(New){

  New.Controller = {

    newMedia: function(){

      this.model = new Moonrakr.Entities.Media();

      // debug
      window.mediaModel = this.model;

      this.view = new New.Uploader({
        model: this.model
      });

      this.attachHandlers();

      return this.view;

    },
    attachHandlers:function(){
      var controller = this;
      this.view.on('media:new:submit', function(){

        controller.view.setLoading();

        this.model.save(null,{
          success: function(data){
            console.log('success', data);
            controller.view.trigger('media:save:success', controller.model);
            controller.view.removeLoading();
          },
          error: function(){
            console.log('error');
          }
        });

      });
    }

  };

});