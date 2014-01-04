/*jshint expr: true*/

define(function(require){

  require('apps/_entities/posts');

  describe('App.Entities Posts Collection', function(){

    beforeEach(function(){
      this.server = sinon.fakeServer.create();
      this.server.autoRespond = true;
      this.posts = new Moonrakr.Entities.Posts();
    });

    afterEach(function(){
      this.server.restore();
    });

    describe('retrieval', function(){

      it('has a single post', function(done){
        var posts = this.posts;
        var post;

        // return a single model on GET
        this.server.respondWith('GET', 'posts', [
          200,
          {'Content-Type': 'application/json'},
          JSON.stringify([{
            id: 1,
            title: 'Test Post #1',
            body: "A pre-existing post from beforeEach"
          }])
        ]);

        // after fetch.
        posts.once('reset', function(){
          expect(posts).to.have.length(1);
          post = posts.at(0);
          expect(post).to.be.ok;
          expect(post.get('title')).to.contain('#1');
          expect(post.get('body')).to.contain('pre-existing');

          done();
        });

        posts.fetch({ reset: true });
      });

    });

  });

});

