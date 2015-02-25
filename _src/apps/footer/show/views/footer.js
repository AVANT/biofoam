// require('app');
require('marionette');
require('handlebars');

var _footer = require('text!apps/footer/show/templates/footer.html');

return Marionette.CompositeView.extend({
  template: Handlebars.compile( _footer ),
  tagName: 'div',
  className: 'footer',

  ui: {
    message: '.js-message'
  },

  events:{
    // 'click .js-submit': 'submitClicked',
    'click .js-about': 'aboutClicked',
    'click .js-privacy': 'privacyClicked',
    'click .js-sponsorship': 'sponsorshipClicked'
  },

  submitClicked: function(e){
    e.preventDefault();
    this.clearMessage();
    if ( this.validateInput() ){
      this.register();
    }
  },

  validateInput: function () {
    // validate that the input is actually an email
    return true;
  },

  register: function () {
    var that = this;
    var $form = this.$el.find('form');
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      error: that.ajaxErrorHandler,
      success: function(data) {
        if (data.result != 'success') {
            that.chimpErrorHandler( data );
        } else {
            that.successHandler( data );
        }
      }
    });
  },

  clearMessage: function(){
    this.ui.message.html('');
  },

  ajaxErrorHandler:function(err){
    this.ui.message.html('Could not connect to the registration server. Please try again later.');
  },

  chimpErrorHandler:function(data){
    // console.log('from mail chimp:', data);
    this.ui.message.html( data.msg );
  },

  successHandler:function(data){
    this.ui.message.html('Thanks for signing up.');
  },

  aboutClicked:function(e){
    e.preventDefault()
    this.trigger('about:clicked')
  },

  privacyClicked:function(e){
    e.preventDefault()
    this.trigger('privacy:clicked')
  },

  sponsorshipClicked:function(e){
    e.preventDefault()
    this.trigger('sponsorship:clicked')
  }
});
