define(function(require){

  var Handlebars = require('handlebars');
  var Moonrakr = require('app');
  var _post = require('text!apps/posts/list/templates/post.html');

  return Moonrakr.module("PostsApp.List", function(List){

    //// postListItemView
    List.Post = Marionette.ItemView.extend({
      tagName: "article",
      template: Handlebars.compile(_post)
    })

    //// postListView
    List.Posts = Marionette.CollectionView.extend({
      tagName: 'div',
      itemView: List.Post
    })

  });
});