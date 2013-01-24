(function (){
'use strict';

var CanvasPlayCircle = app.views.CanvasPlay.extend({
    getFixture: function (){
        var fixDef = new Box2D.Dynamics.b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.6;
        return fixDef;
    },
    setWorld: function (worldobj){
        var body,
            fixDef = this.getFixture(),
            bodyDef = new Box2D.Dynamics.b2BodyDef;
            
        if (this.model.get('is_static') == true) {
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        } else {
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        }
        bodyDef.userData = this.model.id;

        bodyDef.position = {}
        bodyDef.position.x = this.model.get('start_x');
        bodyDef.position.y = this.model.get('start_y');
        bodyDef.angle = this.model.get('start_angle');
        
        body = worldobj.world.CreateBody(bodyDef);

        fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(this.model.get('radius'));

        body.CreateFixture(fixDef);
          
        this.worldobj = worldobj;
  
    },
    draw: function (canvasLayer){
        var scale = canvasLayer.scale,
            id = this.model.id,
            pos = this.worldobj.get('positions'),
            x = pos[id].x * scale,
            y = pos[id].y * scale,
            angle = pos[id].angle,
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

app.views.canvasplay.itemView.addConstructor([null, app.validators.is_circle], CanvasPlayCircle);


}());
