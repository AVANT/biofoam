define(function(require){

  require('apps/_entities/posts');
  require('apps/posts/posts_app');

  describe('App.Posts.Show Views', function(){

    before(function(){
      // create handle for this fixture
      this.$fixture = $('<div id="post-view-fixture"></div>')
    });

    after(function(){
      // remove all handles from #fixtures
      $("#fixtures").empty();
    });

    beforeEach(function(){
      // empty out and append fixture to #fixtures
      this.$fixture.empty().appendTo($('#fixtures'));
      // create view and model
      this.view = new Moonrakr.PostsApp.Show.Post({
        model: new Moonrakr.Entities.Post()
      });
      // render view into this.$fixture
      this.$fixture.append( this.view.render().el );
    });

    afterEach(function(){
      // destory model, which destories the view
      this.view.model.destroy();
    });

    it('can render empty post', function(){

      var $img = $('.title-img');
      var $title = $('.title');
      var $excerpt = $('.excerpt');
      var $body = $('.body');

      expect( $img ).to.be.length(1);

      expect( $title.text() ).to.equal("");
      expect( $title.prop('tagName').toLowerCase() ).to.equal("h2");

      expect( $excerpt.text() ).to.equal("");
      expect( $excerpt.prop('tagName').toLowerCase() ).to.equal("p");

      expect( $body.text() ).to.equal("");
      expect( $body.prop('tagName').toLowerCase() ).to.equal("div");

    });


    // fix this async test problem with sinon.js?
    it('can render simple post', function(){

      this.view.model.once('change', function(){

        var $title = $('.title');
        var $excerpt = $('.excerpt');
        var $body = $('.body');

        expect( $title.text() ).to.equal("title text");
        expect( $excerpt.text() ).to.equal("excerpt text");
        expect( $body.text() ).to.equal("body text");

        done();
      });

      this.view.model.set({
        'title': 'title text',
        'excerpt': 'excerpt text',
        'body': 'body text'
      });

    });


  });

});