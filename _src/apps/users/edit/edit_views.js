/**
@module users
@submodule users.edit
@namespace users.edit
**/

require('app');
require('handlebars');
require('apps/users/_common/views/form');

return Moonrakr.module('Users.Edit', function(Edit){

  /**
  @class User
  @constructor
  **/
  Edit.User = Moonrakr.Users.Common.Views.Form.extend({
    templateHelpers: {
      submitText: 'Save User',
      titleText: 'Edit User'
    }
  });

});