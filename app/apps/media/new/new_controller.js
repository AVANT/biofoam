define(function(require){

  var App = require('app');
  require('apps/_entities/media');
  require('apps/media/new/views/uploader');

  return App.module('Media.New', function(New){

    New.Controller = {

      newMedia: function(){

        this.model = new App.Entities.Media();
        this.view = new New.Uploader({
          model: this.model
        });

        this.attachHandlers();

        return this.view;

      },
      attachHandlers:function(){
        this.view.on('media:new:submit', function(){

          this.model.save(null,{
            success: function(data){
              console.log('success', data);
              // trigger event with model data
            },
            error: function(){
              console.log('error');
            }
          });
        });
      }

    };

  });

});