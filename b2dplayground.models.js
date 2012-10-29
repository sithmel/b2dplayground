(function (models, plugins){

models.GenericModel = Backbone.Model.extend({
//    defaults: {
//    },
//    initialize: function (){
//    },
//    validate: function (attributes){
//    }
});


/*
worlds collection
*/

var Worlds = Backbone.Collection.extend({
    model: models.GenericModel,
//    localStorage: new Backbone.LocalStorage("backbone-b2dplayground-worlds"),
//    url : "/data/stuff",
    initialize: function(){
        this.on('destroy', this.delete_from_collection, this);
    },
    delete_from_collection : function (obj){
        this.remove(obj);
    }
});


models.worlds = new Worlds();

/*
Load worlds

Worlds are loaded explicity here. In the near future they can be serialized somewhere
*/

_(plugins.worlds.all()).each(function (world){
    var w = new models.GenericModel(world);
    models.worlds.add(w);
});


/*
bodies collection
*/

var Bodies = Backbone.Collection.extend({
    model: models.GenericModel,
    localStorage: new Backbone.LocalStorage("backbone-b2dplayground-bodies"),
//    url : "/data/stuff",
    initialize: function(){
        this.on('destroy', this.delete_from_collection, this);
    },
    delete_from_collection : function (obj){
        this.remove(obj);
    }
});


models.bodies = new Bodies();



models.load = function (){
      models.bodies.fetch();

//    models.worlds.fetch({
//       success: function (){
//           models.bodies.fetch();
//       }
//    });
};

}(window.B2DPLAYGROUND.models, window.B2DPLAYGROUND.plugins));


