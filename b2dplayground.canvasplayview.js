(function (plugins, utils, models){

/*
canvas play view (main app)
*/

var CanvasPlayView = Backbone.View.extend({
    CANVAS_HEIGHT : 14,
    CANVAS_WIDTH : 18,
    SCALE : 30,
    el: $("#play"),
    events: {
          "click .play": "play",
          "click .stop": "stop"
    },
    play: function (){

        this.worlds = models.worlds.map(function (w){
            return plugins.createWorld(w);
        });

        _(this.worlds).each(function (world){
            world.init(models.bodies);
        });
        this.$el.addClass('play')
        this.last_render_time = 0;

        that = this;
        $(window).on('requestAnimEvent', function (){
            that.render();
        });

    },
    stop: function (){
        _(this.worlds).each(function (world){
            world.destroy();
        });
        delete this.worlds;
        this.$el.removeClass('play');
        $(window).off('requestAnimEvent');
        
    },
    updateworlds: function (){
        var positions = {},
            render_time = new Date().getTime() / 1000;
            positions = {},
            stepRate = this.last_render_time && render_time - this.last_render_time ||  1 / 60;

        _(this.worlds).each(function (world){
            var pos = world.update(stepRate);
            positions = _.extend(positions, pos);
        });
        this.last_render_time = render_time;
        return positions;
    },
    initialize: function() {
        // setup the canvas
        var canvas = this.$el.find('#canvasplay').get(0);
        this.canvasLayer = new utils.CanvasLayer(canvas, this.CANVAS_HEIGHT, this.CANVAS_WIDTH, this.SCALE);
    },
    render: function() {
        var modelView,
            node,
            positions,
            $el = this.$el,
            canvasLayer = this.canvasLayer;

        
        positions = this.updateworlds();
 
        canvasLayer.clear();

        models.bodies.each(function (element, index){
            var pos, x, y, angle;
            pos = positions[element.id];
            if (! pos){
                return;
            }
            x = pos.x;
            y = pos.y;
            angle = pos.angle;

            canvasLayer.ctx.save();
            canvasLayer.ctx.translate(x * canvasLayer.scale, y * canvasLayer.scale);
            canvasLayer.ctx.rotate(angle);

            plugins.drawer(element).render(canvasLayer);

            canvasLayer.ctx.restore();

        });
        return this;
    }
});

var canvasplayview = new CanvasPlayView();

}(window.B2DPLAYGROUND.plugins, window.B2DPLAYGROUND.utilities, window.B2DPLAYGROUND.models));

