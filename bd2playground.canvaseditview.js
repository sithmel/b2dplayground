(function (plugins, utils, models){

/*
canvas edit view (main app)
*/
var CanvasEditView = Backbone.View.extend({
    CANVAS_HEIGHT : 14,
    CANVAS_WIDTH : 18,
    SCALE : 30,
    el: $("#edit"),
    events: {
    },
    initializeForm: function (){
        var shapes =  plugins.shapes.all(),
            addnode = this.$el.find('.additems');

        // setup add panel
        _.each(shapes, function (obj){
            $('<input type="button" value="' + obj.shape + '" />').addClass('btn btn-primary')
            .click(function (){
                var model = new models.GenericModel(obj);
                models.bodies.add(model);
                model.save();
            })
            .appendTo(addnode);
        });    

        this.$editnode = this.$el.find('.edititems');

    },
    initializeCanvas: function (){
        // setup the canvas
        var canvas = this.$el.find('#canvasedit').get(0),
            canvasLayer = new utils.CanvasLayer(canvas, this.CANVAS_HEIGHT, this.CANVAS_WIDTH, this.SCALE),
            move_starting_position = null,
            that = this;

        this.selected = null;
        this.canvasLayer = canvasLayer;

//        $(this.canvasLayer.canvas).click(function (evt){
        $(canvasLayer.canvas).mousedown(function (evt){
            var rect = this.getBoundingClientRect(),
                drawer,
                posx = evt.clientX - rect.left,
                posy = evt.clientY - rect.top,
                obj, i;

            for (i = models.bodies.length; i > 0; i--){
                obj = models.bodies.toArray()[i-1];
                drawer = plugins.drawer(obj);
                if(drawer.isAt(posx, posy, canvasLayer)){
                    that.selected = obj.cid;
                    move_starting_position = [posx, posy];
                    return false;
                }
            }
            that.selected = null; // no item under the mouse pointer
            move_starting_position = [posx, posy];
            return false;
        });

        $(this.canvasLayer.canvas).mouseup(function (evt){
           var model;
           if (! that.selected){
               return false;
           }
           model = models.bodies.getByCid(that.selected);
           model.save();
           move_starting_position = null;
           //that.selected = null;
           return false;
        });

        $(this.canvasLayer.canvas).mousemove(function (evt){
           if (!that.selected || !move_starting_position){
               return false;
           }
            var rect = this.getBoundingClientRect(),
                posx = evt.clientX - rect.left,
                posy = evt.clientY - rect.top,
                model = models.bodies.getByCid(that.selected),
                x = model.get('start_x') * canvasLayer.scale,
                y = model.get('start_y') * canvasLayer.scale;
           
           model.set({start_x: (x + posx - move_starting_position[0]) / canvasLayer.scale, 
                      start_y: (y + posy - move_starting_position[1]) / canvasLayer.scale});
           move_starting_position = [posx, posy];
        });
    },
    initialize: function() {

        this.initializeForm();
        this.initializeCanvas();

//        $(window).on('requestAnimEvent', function (){
//            that.render();
//        });

        models.bodies.on('reset', this.render, this);
        models.bodies.on('remove', this.render, this);
        models.bodies.on('add', this.render, this);
        models.bodies.on('change', this.render, this);


    },
    renderCanvas: function (){
        var modelView,
            node,
            $el = this.$el,
            canvasLayer = this.canvasLayer;

            canvasLayer.clear();

            models.bodies.each(function (element, index){
                var x, y, angle;
                x = element.get('start_x');
                y = element.get('start_y');
                angle = element.get('start_angle');

                canvasLayer.ctx.save();
                canvasLayer.ctx.translate(x * canvasLayer.scale, y * canvasLayer.scale);
                canvasLayer.ctx.rotate(angle);
            
                plugins.drawer(element).render(canvasLayer);

                canvasLayer.ctx.restore();

            });
    },
    renderForm: function (){
        var modelView, node,
            $editnode = this.$editnode,
            selected = this.selected;
            
        $editnode.empty();
        models.bodies.each(function (element, index){
            var node = $('<form class="form-horizontal" />').appendTo($editnode),
                modelView = plugins.editor(element).getView(node);
                
            if (element.cid === selected){
                node.addClass('selected');
            }
            modelView.render();
        });
    },    
    render: function() {
        this.renderCanvas();
        this.renderForm();
        return this;
    }
});

var canvaseditview = new CanvasEditView();

}(window.B2DPLAYGROUND.plugins, window.B2DPLAYGROUND.utilities, window.B2DPLAYGROUND.models));

