describe('chai chains', function(){

  it('shows off some all the different ways they can be used', function(){

    // # these chains *dont* change the assertions
    expect('foo').a('string');
    expect('foo').to.be.a('string');
    expect('foo').to.have.been.a('string');
    expect('foo').that.is.a('string');

    // chains can be repeated (or be nonsensical)
    expect('foo').to.to.to.to.a('string');
    expect('foo').and.with.at.of.a('string');

    // # these chains *do* change the assertions
    expect('foo').to.not.equal('bar');

    // interesting behavior of 'deep.equal'
    expect({foo: 'bar'}).to.equal({foo:'bar'}); // fails
    expect({foo: 'bar'}).to.deep.equal({foo:'bar'}); // passes

    // can chain assertions too
    expect('foo')
      .to.be.a('string').and
      .to.equal('foo').and
      .to.have.length(3).and
      .to.match(/f[o]{2}/);

  });

});