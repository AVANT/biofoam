require('app');
require('handlebars');

var _post = require('text!apps/threads/edit/templates/post.html');

return Moonrakr.module('Threads.Edit', function (Edit) {

  Edit.Post = Marionette.ItemView.extend({
    className: 'post',
    template: Handlebars.compile( _post ),
    events: {
      'click .js-checkbox': 'checkboxClicked'
    },

    checkboxClicked: function () {
      if ( this.isChecked() ) {
        this.addThreadProp();
      } else {
        this.removeThreadProp();
      }
    },

    isChecked: function() {
      return this.$('.js-checkbox').prop('checked');
    },

    // Move all bellow to model //
    addThreadProp: function () {
      this.setThreadProp(true);
    },

    removeThreadProp: function () {
      this.setThreadProp(false);
    },

    setThreadProp: function (bool) {
      var threadID = this.getThreadID();
      var threadArray = this.model.get('meta');

      if (bool) {
        threadArray = _.uniq(_.union(threadArray, threadID));
      } else {
        threadArray = _.without(threadArray, threadID);
      }

      this.model.set('meta', threadArray);

      console.log('bool:', bool);
      console.log('threadID:', threadID);
      console.log('threadArray:', threadArray);
      console.log('this post meta:', this.model.get('meta'));
    },

    getThreadID: function () {
      return 'transmediale';
    }
  });

});
