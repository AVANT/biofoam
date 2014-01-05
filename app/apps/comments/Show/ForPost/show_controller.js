require('app');
require('apps/comments/show/forpost/show_views');

return Moonrakr.module('Comments.Show.ForPost', function(ForPost){
  ForPost.Controller = {
    /*** Show ForPost Comment ***
    Views: Comment Layout
            - User View
            - CMS Panel
    Models: Comment
            User
    */

    // api call
    showComment: function( model ){
      this.authGranted = Moonrakr.Common.Controller.helper.getAuthFlag( ForPost.CMSPanel );
      return this.getCommentView(model);
    },
    getCommentView: function(model){
      this.cmsPanel = ((this.authGranted) ? new ForPost.CMSPanel() : null);
      var commentLayoutView = new ForPost.Comment({
        model: model
      });
      this.setHanlders( commentLayoutView );
      return commentLayoutView;
    },
    setHanlders: function( view ){
      var self = this;
      // handler for the render user event
      view.on('render:user', function(userId){
        var fetchingUser = Moonrakr.request('user:entity', userId);
        $.when(fetchingUser).done(function(user){
          var userView;
          if (user !== undefined){
            userView = new ForPost.User({
              model: user
            });
          }
          else{
            console.log('something failed while fetching the user');
            // TODO handle the case where fetching the user fails
          }
            view.addContext.show(userView);
        });
      });

      // handler for showing cmsPanel
      if (self.authGranted){
        view.on('render', function(){ // weird timing bug if you use 'show'
          view.cmsPanel.show( self.cmsPanel );
        });
      }

      // handler for the comment delete event
      view.on('comment:delete', function(){
        this.model.destroy();
        this.close();
      });
    }
  }
});