var app = app || {};
app.collections = app.collections || {};

(function (){
'use strict';
var Bodies = Backbone.Collection.extend({
    model: occamsrazor(),
    localStorage: new Backbone.LocalStorage("backbone-b2dplayground-bodies")
});

app.collections.bodies = new Bodies();

}());

