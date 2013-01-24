(function (){
'use strict';

app.views.CanvasEdit = Backbone.Occamsrazor.ItemView.extend({
    selected: false,
    move_starting_position: null,
    initialize: function (options, model){
        Backbone.Occamsrazor.ItemView.prototype.initialize.call(this, options, model)

        this.on('mousedown', this.mousedown, this);
        this.on('mouseup', this.mouseup, this);
        this.on('mousemove', this.mousemove, this);
//        this.on('click', this.click, this);


    },
//    click: function (evt){
//        this.model.trigger('click', evt);
//    },
    mousedown: function (evt){
        this.selected = true;
        this.move_starting_position = [evt.x, evt.y]
        this.model.trigger('click', evt);
    },
    mouseup: function (evt){
        if(this.selected){
            this.model.save();
            this.move_starting_position = null;
            this.selected = false;
        }
    },
    mousemove: function (evt){
        var x, y;
        if(this.selected){
            x = this.model.get('start_x');
            y = this.model.get('start_y');
            this.model.set({start_x: (x + evt.x - this.move_starting_position[0]), 
                            start_y: (y + evt.y - this.move_starting_position[1])});
            this.move_starting_position = [evt.x, evt.y];
        }
    }
});

}());
