require('handlebars');
require('app');

var _loginForm = require('text!apps/auth/login/templates/login_form.html');

return Moonrakr.module('Auth.Login', function(Login){

  Login.LoginView = Marionette.ItemView.extend({
    template: Handlebars.compile( _loginForm ),

    events: {
      'click .js-login': 'loginClicked',
      'click .js-signup': 'signupClicked'
    },

    bindings: {
      '#username': 'user',
      '#password': 'password',
    },

    onRender: function(){
      this.stickit();
    },

    signupClicked: function(e){
      e.preventDefault();
      this.trigger('view:signup');
    },

    loginClicked: function(e){
      e.preventDefault();
      this.trigger('form:submit');
    },

    onFormDataInvalid: function(errors){
      var $view = this.$el;

      var clearFormErrors = function(){
        var $form = $view.find('form');
        $form.find('.help-inline.error').each(
          function(){
            $(this).remove();
        });
        $form.find('.control-group.error').each(
          function(){
            $(this).removeClass('error');
        });
      };

      var markErrors = function(value, key){
        var $controlGroup = $view.find(key).parent();
        var $errorEl = ('<span>', {class: 'help-inline error', text: value});
        $controlGroup.appen($errorEl).addClass('error');
      };

      clearFormErrors();
      _.each(errors, markErrors);
    }

  });

});