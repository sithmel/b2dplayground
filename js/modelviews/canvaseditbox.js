(function (){
'use strict';

var CanvasEditBox = app.views.CanvasEdit.extend({
    isAt: function (x, y){
        var pos = new app.utilities.Point(x, y),
            angle = this.model.get('start_angle'),
            elx = this.model.get('start_x'),
            ely = this.model.get('start_y'),
            w = this.model.get('width'),
            h = this.model.get('height');

        pos.translate(-elx, -ely);
        pos.rotate(-angle);

        if (pos.x > -(w/2) && pos.x < w/2 && pos.y > -(h/2) && pos.y < h/2){
            return true;
        }
        return false;
    },
    draw: function (canvasLayer){
        var scale = canvasLayer.scale,
            x = this.model.get('start_x') * scale,
            y = this.model.get('start_y') * scale,
            angle = this.model.get('start_angle'),
            w = this.model.get('width') * scale,
            h = this.model.get('height') * scale;

        canvasLayer.ctx.save();
        canvasLayer.ctx.translate(x, y);
        canvasLayer.ctx.rotate(angle);
            

        canvasLayer.ctx.fillStyle = this.model.get('color');
        canvasLayer.ctx.fillRect(
            -(w / 2),
            -(h / 2),
            w,
            h
        );
        canvasLayer.ctx.restore();
    }
});

app.views.canvasedit.itemView.addConstructor([null, app.validators.is_box], CanvasEditBox);

}());
