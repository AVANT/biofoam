define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _comment = require('text!apps/comments/show/_common/templates/comment.html');
  var _cmsPanel = require('text!apps/comments/show/_common/templates/cms_panel.html');
  var _missingComment = require('text!apps/comments/show/_common/templates/missing_comment.html');

  return Moonrakr.module('Comments.Show.Common.Views', function(Views){

    Views.Comment = Marionette.Layout.extend({
      tagName: 'li',
      template: Handlebars.compile( _comment ),
      regions: {
        addContext: '.js-add-context-region',
        cmsPanel: '.js-cms-panel-region'
      },
      events: {
        'click .user-information': 'userClicked'
      },
      onShow: function(e){
        this.trigger('render:user', this.model.get('userId'));
        this.trigger('render:post', this.model.get('postId'));
      },
      userClicked: function(e){
        e.preventDefault();
        Moonrakr.trigger('user:show', this.model.get('userId'));
      }
    });

    Views.CMSPanel = Moonrakr.Common.Views.CMSPanel.extend({
      tagName: 'div',
      className: 'cms-panel',
      authLevelRequired: 3, // 3 = editor
      template: Handlebars.compile( _cmsPanel ),
      events: {
        'click .js-delete': 'deleteClicked'
      },
      deleteClicked: function(e){
        e.preventDefault();
        this.trigger('comment:delete');
      }
    });

    Views.MissingComment = Marionette.ItemView.extend({
      template: Handlebars.compile( _missingComment )
    });

  });

});