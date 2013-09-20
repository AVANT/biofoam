# you can delete this file

describe 'The vendor scripts', ->

  it 'has jquery defined', ->
    expect(typeof($)).toBe('function')

  it 'has underscore defined', ->
    expect(typeof(_)).toBe('function')

  it 'has handlebars defined', ->
    require ['handlebars'], (Handlebars) ->
      expect(typeof(Handlebars)).toBe('function')

  it 'has backbone defined', ->
    expect(typeof(Backbone)).toBe('object')

  it 'has marionette defined', ->
    expect(typeof(Marionette)).toBe('object')

  it 'has text defined', ->
    expect(typeof(Text)).toBe('object')
