(function (){
'use strict';

var CanvasEditCircle = app.views.CanvasEdit.extend({
    isAt: function (x, y){
        var pos = new app.utilities.Point(x, y),
            elx = this.model.get('start_x'),
            ely = this.model.get('start_y'),
            radius = this.model.get('radius');

        pos.translate(-elx, -ely);

        if (pos.distanceFrom(0, 0) <= radius){
            return true;
        }
        return false;
    },
    draw: function (canvasLayer){
        var scale = canvasLayer.scale,
            x = this.model.get('start_x') * scale,
            y = this.model.get('start_y') * scale,
            angle = this.model.get('start_angle'),
            r = this.model.get('radius') * scale;

        canvasLayer.ctx.save();
        canvasLayer.ctx.translate(x, y);
        canvasLayer.ctx.rotate(angle);
            
        canvasLayer.ctx.fillStyle = this.model.get('color');
        canvasLayer.ctx.beginPath();
        canvasLayer.ctx.arc(0, 0, r, 0, Math.PI * 2, true);
        canvasLayer.ctx.closePath();
        canvasLayer.ctx.fill();

        canvasLayer.ctx.restore();
    }

});

app.views.canvasedit.itemView.addConstructor([null, app.validators.is_circle], CanvasEditCircle);

}());
