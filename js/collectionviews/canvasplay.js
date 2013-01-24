var app = app || {};
app.views = app.views || {};

(function (){
'use strict';

/*
canvas edit view
*/
var CanvasPlayView = Backbone.Occamsrazor.CollectionView.extend({
    CANVAS_HEIGHT : 14,
    CANVAS_WIDTH : 18,
    SCALE : 30,
    el: $("#play"),
    itemView: occamsrazor(),
    events: {
          "click .play": "play",
          "click .stop": "stop"
    },

    initialize: function (options){
        // setup the canvas
        var canvas = this.$el.find('canvas').get(0),
            that = this;

        this.canvasLayer = new app.utilities.CanvasLayer(canvas, this.CANVAS_HEIGHT, this.CANVAS_WIDTH, this.SCALE);

        this.world = new app.models.B2DWorld({
            worldtype: 'b2d',
            gravity_x: 0,
            gravity_y: 10
        });

        Backbone.Occamsrazor.CollectionView.prototype.initialize.call(this, options);
    },
    addToView: function (view, index){
    },
    play: function (){
        var that = this;

        this.world.init();
        //init worlds
        _(this.children).each(function (shapeview){
            shapeview.setWorld(that.world);
        });

        this.$el.addClass('play')

        $(window).on('requestAnimEvent', function (){
            that.draw();
        });
    },
    stop: function (){
        this.world.destroy();

        this.$el.removeClass('play');
        $(window).off('requestAnimEvent');
    },
    draw: function  (){
        var that = this;

        this.world.update();

        this.canvasLayer.clear();

        this.collection.each(function (model){
            that.children[model.cid].draw(that.canvasLayer);
        });
    }
});

app.views.canvasplay = new CanvasPlayView({collection: app.collections.bodies});

}());
