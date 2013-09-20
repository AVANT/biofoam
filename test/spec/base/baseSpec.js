/* you can delete this file */

describe('The vendor scripts', function(){

  it('has jquery defined', function(){
    expect(typeof($)).toBe('function');
  });

  it('has underscore defined', function(){
    expect(typeof(_)).toBe('function');
  });

  it('has handlebars defined', function(){
    require(['handlebars'], function(Handlebars){
      expect(typeof(Handlebars)).toBe('function');
    });
  });

  it('has backbone defined', function(){
    expect(typeof(Backbone)).toBe('object');
  });

  it('has marionette defined', function(){
    expect(typeof(Marionette)).toBe('object');
  });

  it('has text defined', function(){
    expect(typeof(Text)).toBe('object');
  });

});
