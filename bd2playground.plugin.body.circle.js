(function (plugins, utils){
/*
*
* CIRCLE
*
*/

plugins.validators.isCircle = occamsrazor.validator(plugins.validators.isAnything, function (obj){
    return obj.get('shape') === 'circle';
});

plugins.shapes.add(function (){
    return {
        shape:      'circle',
        radius:     1,
        color:      '#22EE33',
//        center_x:   null,
//        center_y:   null,
        is_static:   false,
        start_x:    3,
        start_y:    3,
        start_angle:0
    };

});

//
// editor
//


plugins.editor.add(function (element){
    var CircleModelView = Backbone.View.extend({
        source: '<h4>{{shape}}</h4>'+
        '<div class="control-group">' + 
        '<label class="control-label">Radius:' + 
        '</label>'+
        '<div class="control">' + 
        '<input name="radius" data-type="float" class="radius input-mini" type="range" min="0.1" max="4" step="0.1" value="{{radius}}"/>' +
        '</div>'+
        '</div>'+
        '<div class="control-group">' + 
        '<label class="control-label">Color:' + 
        '</label>'+
        '<div class="control">' + 
        '<input name="color" data-type="string" class="color input-mini" value="{{color}}"/>' + 
        '</div>'+
        '</div>'+
        '<div class="control-group">' + 
        '<label class="control-label">Static:' + 
        '</label>'+
        '<div class="control">' + 
        '<select name="is_static" data-type="boolean" class="is_static input-mini">'+
        '<option {{#if is_static}}selected="selected"{{/if}} value="true">Yes</option>'+
        '<option {{#unless is_static}}selected="selected"{{/unless}} value="false">No</option>'+
        '</select>' +
        '</div>'+
        '</div>'+
        '<div class="control-group">' + 
        '<label class="control-label">X:' + 
        '</label>'+
        '<div class="control">' + 
        '<input name="start_x" data-type="float" class="start_x input-mini" type="range" min="1" max="30" step="1" value="{{start_x}}"/>' + 
        '</div>'+
        '</div>'+
        '<div class="control-group">' + 
        '<label class="control-label">Y:' +
        '</label>'+
        '<div class="control">' + 
        '<input name="start_y" data-type="float" class="start_y input-mini" type="range" min="1" max="30" step="1" value="{{start_y}}"/>' + 
        '</div>'+
        '</div>'+
        '<input type="button" class="delete btn btn-danger" value="delete"/>',
        events: {
            "click .delete":    "del",
            "change": "edit"
        },
        initialize: function (){
            this.template = Handlebars.compile(this.source);
        },
        render: function(){
            var html = this.template(this.model.toJSON());
            this.$el.append(html);
            return this;
        },
        del: function (){
            this.model.destroy();
        },
        edit: function (){
            var name,
                obj = utils.form2obj(this.$el);
            for (name in obj){
                this.model.set(name, obj[name]);
            }

            this.model.save();
        }
    });

    return {
        getView : function ($node){
            return new CircleModelView({model:element, el: $node });
        }
    };
}, plugins.validators.isCircle);


plugins.drawer.add(function (element){
    var GenericModelView = Backbone.View.extend({
        render: function(canvasLayer){
            var m = this.model,
                scale = canvasLayer.scale;

            canvasLayer.ctx.fillStyle = m.get('color');
            canvasLayer.ctx.beginPath();
            canvasLayer.ctx.arc(0, 0, m.get('radius') * scale, 0, Math.PI * 2, true);
            canvasLayer.ctx.closePath();
            canvasLayer.ctx.fill();

            return this;
        },
        isAt: function (x, y, canvasLayer){
            var pos = new utils.Point(x, y),
                m = this.model,
                scale = canvasLayer.scale,
                elx = m.get('start_x') * scale,
                ely = m.get('start_y') * scale,
                radius = m.get('radius') * scale;

            pos.translate(-elx, -ely);

            if (pos.distanceFrom(0, 0) <= radius){
                return true;
            }
            return false;
        }
    });
    return new GenericModelView({model:element });

}, plugins.validators.isCircle);

var fixDef = new Box2D.Dynamics.b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.5;
fixDef.restitution = 0.6;

var getDefaultFixture = function (){
    // cached fixture 
    return fixDef;
};

plugins.addToWorld.add(function (element, w){
    var world = w.world,
        body,
        fixDef = getDefaultFixture();
        bodyDef = new Box2D.Dynamics.b2BodyDef;
        
    if (element.get('is_static') == true) {
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    } else {
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    }
    bodyDef.position.x = element.get('start_x');
    bodyDef.position.y = element.get('start_y');
    bodyDef.userData = element.id;
    bodyDef.angle = element.get('start_angle');

    body = world.CreateBody(bodyDef);

    fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(element.get('radius'));
    body.CreateFixture(fixDef);

}, [plugins.validators.isCircle, plugins.validators.isB2DWorld]);


}(window.B2DPLAYGROUND.plugins, window.B2DPLAYGROUND.utilities));

