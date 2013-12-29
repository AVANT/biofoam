define(function(require){

  require('apps/_entities/menu');
  require('apps/menu/menu_app');

  describe('App.Menu.List Views', function(){

    before(function(){
      // create this.$fixture for menu to render into
      this.$fixture = $('<div id="menu"></div>');
      // create a stub collection
      this.collection = new Moonrakr.Entities.HeaderCollection([
        { name: 'Posts', url: 'posts', navigationTrigger: 'posts:list' },
        { name: 'Users', url: 'users', navigationTrigger: 'users:list' },
        { name: 'About', url: 'pages/about', navigationTrigger: 'pages:show', navigationString:'about' }
      ]);
    });

    after(function(){
      // release everthing from $('#fixtures')
      $('#fixtures').empty();
    });

    beforeEach(function(){
      // create a new menu view...
      this.view = new Moonrakr.Menu.List.Menu({
        collection: this.collection
      });

      // and render into this.$fixture
      this.$fixture.append( this.view.render().el );
    });

    afterEach(function(){
      // remove the view
      this.view.remove();
    });

    describe('events', function(){

      it('fires events on itemviews click', function(){
        var navSpy = sinon.spy();

        // attach spy to view to watch events triggered
        this.view.on({
          'itemview:navigate': navSpy
        });

        // click all the menu links
        this.$fixture.find('.menu-item a').click();

        expect(navSpy).to.have.been.calledThrice;
      })

    });

    describe('menu bar display', function(){

      it('displays a list of itemviews', function(){

        expect( this.$fixture.find('.menu-item').length ).to.be.equal(3);

      });

      it('can set a menu-item as active when model is "selected"', function(){

        this.collection.each(function(m){
          // selecting each model in the collection will cause only the last model to remain selected
          m.select();
        });
        this.collection.trigger('reset');

        expect( this.$fixture.find('.menu-item.active').length ).to.be.equal(1);

      });
    });

  });

});