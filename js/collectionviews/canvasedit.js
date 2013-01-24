var app = app || {};
app.views = app.views || {};

(function (){
'use strict';

/*
canvas edit view
*/
var CanvasEditView = Backbone.Occamsrazor.CollectionView.extend({
    CANVAS_HEIGHT : 14,
    CANVAS_WIDTH : 18,
    SCALE : 30,
    el: $("#editcanvas"),
    itemView: occamsrazor(),
    events: {
    },
    initialize: function (options){
        // setup the canvas
        var canvas = this.$el.find('canvas').get(0),
            that = this;

        this.canvasLayer = new app.utilities.CanvasLayer(canvas, this.CANVAS_HEIGHT, this.CANVAS_WIDTH, this.SCALE);

        $(this.canvasLayer.canvas).on('mousedown mouseup mousemove click', function (evt){
            var i, view,
                rect = this.getBoundingClientRect(),
                posx = (evt.clientX - rect.left) / that.canvasLayer.scale,
                posy = (evt.clientY - rect.top) / that.canvasLayer.scale,
                view_ids = that.collection.map(function (model){
                    return model.cid;
                });
                for (i = view_ids.length - 1; i >= 0 ; i--){
                    view = that.children[view_ids[i]];
                    if(evt.type === 'mousemove'){
                        view.trigger(evt.type, {x: posx, y: posy});
                    }
                    else if(view.isAt(posx, posy)){
                        view.trigger(evt.type, {x: posx, y: posy});
                        break;
                    }
          
                }

            return false;           
        });

        this.listenTo(this.collection, "all", this.draw);

        Backbone.Occamsrazor.CollectionView.prototype.initialize.call(this, options);
    },
    addToView: function (view, index){
    },
    draw: function  (){
        var that = this;

        this.canvasLayer.clear();

        this.collection.each(function (model){
            that.children[model.cid].draw(that.canvasLayer);
        });
    }

});

app.views.canvasedit = new CanvasEditView({collection: app.collections.bodies});

}());
