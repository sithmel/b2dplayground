var app = app || {};
app.views = app.views || {};

(function (){
'use strict';

/*
canvas edit view
*/
var FormEditView = Backbone.Occamsrazor.CollectionView.extend({
    el: $("#edit"),
    events: {
    },
    itemView: occamsrazor()
});




var FormAddView = Backbone.View.extend({
    el: $("#add"),
    initialize: function (options){
        var that = this, 
            shapes =  app.newobj.BodyPlugins.all(),
            addnode = this.$el.find('.additems');

        // setup add panel
        _.each(shapes, function (obj){
            $('<input type="button" value="' + obj.shape + '" />').addClass('btn btn-primary')
            .click(function (){
                
                var model = new that.collection.model(obj);
                
                that.collection.add(model);
                model.save();
            })
            .appendTo(addnode);
        });

    }
});

app.views.formedit = new FormEditView({collection: app.collections.bodies});

app.views.formadd = new FormAddView({collection: app.collections.bodies});

}());
