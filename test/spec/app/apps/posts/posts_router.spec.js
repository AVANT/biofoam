define(function(require){

  require('apps/posts/posts_app');

  // router
  describe('App.Posts.Router', function(){

    beforeEach(function(){
      // sub route methods
      // sinon.stub(Moonrakr.Posts.Router.prototype, "showPost");
      this.listSpy = sinon.spy();
      this.newSpy = sinon.spy();
      this.showSpy = sinon.spy();
      this.editSpy = sinon.spy();

      // init router with stubs and manual fakes
      this.router = new Moonrakr.Posts.Router({
        controller: {
          listPosts: this.listSpy,
          newPost: this.newSpy,
          showPost: function(id){
            this.showSpy
          },
          editPost: this.editSpy
        }
      });

      // will application will start history ??
      Backbone.history.start();

      // spy on all route events
      this.routerSpy = sinon.spy();
      this.router.on('route', this.routerSpy);
    });

    afterEach(function(){
      Backbone.history.stop();

      // Moonrakr.Posts.Router.prototype.showPost.restore();
    });

    it('can route to a post', function(){
      this.router.navigate('posts/1');
      // Moonrakr.navigate('posts/' + 1);
      // Moonrakr.trigger('post:show', 1);

      // check router method
      expect( this.showSpy )
        .to.have.been.calledOnce.and
        .to.have.been.calledWithExactly('1');

      // check route event
      expect(this.routerSpy)
        .to.have.been.calledOnce.and
        .to.have.been.calledWith('posts', '1');
    });

  });

});