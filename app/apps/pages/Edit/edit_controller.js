define(function(require){

  var Moonrakr = require('app');
  require('apps/pages/edit/edit_views');

  return Moonrakr.module('Pages.Edit', function(Edit){

    Edit.Controller = {
      // api call
      editPage: function(slug){
        var that = this;

        Moonrakr.Common.Controller.helper.cueLoadingView();

        var fetchingPage = Moonrakr.request('pages:entity', slug);
        $.when(fetchingPage).done(function(page){

          if(page !== undefined){

            var view = new Edit.Page({
              model: page
            });

            // init redactor view and insert model.body
            var redactorView = that.getRedactorView( page.get('content') );

            view.on('show', function(){
              this.redactorRegion.show( redactorView );
            });

            view.on('form:submit', function(data){
              page.save(data, {
                success: function(){
                  Moonrakr.trigger('pages:show', page.get('id') );
                },
                error: function(){
                  console.log('uh oh');
                }
              });
            });

          }
          else {
            // TODO handle the case where the server doesnt return a page
          }

          Moonrakr.mainRegion.show( view );

        });
      },
      getRedactorView: function(body){
        return new Edit.Redactor({
          textareaId: 'redactor', // not well decoupled from
          textareaValue: body
        });
      }
    }

  });

});