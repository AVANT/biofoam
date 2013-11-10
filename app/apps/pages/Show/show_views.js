define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _page = require('text!apps/pages/show/templates/page.html');
  var _pageLayout = require('text!apps/pages/show/templates/page_layout.html');
  var _pagePanel = require('text!apps/pages/show/templates/page_panel.html');

  return Moonrakr.module('Pages.Show', function(Show){

    Show.Page = Marionette.ItemView.extend({
      template: Handlebars.compile( _page ),
    });

    Show.Layout = Marionette.Layout.extend({
      template: Handlebars.compile( _pageLayout ),
      regions: {
        panelRegion: '#panel-region',
        pageRegion: '#page-region'
      }
    });

    Show.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      authLevelRequired: 3, // 3=editors
      template: Handlebars.compile( _pagePanel ),
      events: {
        'click .js-edit': 'editClicked'
      },
      editClicked: function(e){
        e.preventDefault();
        this.trigger('pages:edit');
      }
    });

  });

});