(function (plugins, utils){
/*
*
* CIRCLE
*
*/

plugins.validators.isBox = occamsrazor.validator(plugins.validators.isAnything, function (obj){
    return obj.get('shape') === 'box';
});

plugins.shapes.add(function (){
    return {
            shape:      'box',
            height:     2,
            width:      1,
            color:      '#22EE33',
//            center_x:   null,
//            center_y:   null,
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
    var BoxModelView = Backbone.View.extend({
        source: '<h4>{{shape}}</h4>'+
        '<div class="control-group">' + 
        '<label class="control-label">Height:' + 
        '</label>'+
        '<div class="control">' + 
        '<input name="height" data-type="float" class="height input-mini" type="range" min="1" max="10" step="1" value="{{height}}"/>' + 
        '</div>'+
        '</div>'+
        '<div class="control-group">' + 
        '<label class="control-label">Width:' + 
        '</label>'+
        '<div class="control">' + 
        '<input name="width" data-type="float" class="width input-mini" type="range" min="1" max="10" step="1" value="{{width}}"/>' + 
        '</div>'+
        '</div>'+
        '<div class="control-group">' + 
        '<label class="control-label">Angle:' + 
        '</label>'+
        '<div class="control">' + 
        '<input name="start_angle" data-type="float" type="range" min="0" max="6.3" step="0.1" class="start_angle input-mini" value="{{start_angle}}"/>' + 
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
            return new BoxModelView({model:element, el: $node });
        }
    };
}, plugins.validators.isBox);

// draw on the canvas

plugins.drawer.add(function (element){
    var GenericModelView = Backbone.View.extend({
        render: function(canvasLayer){
            var m = this.model,
                scale = canvasLayer.scale,
                w = m.get('width') * scale,
                h = m.get('height') * scale;

            canvasLayer.ctx.fillStyle = m.get('color');
            canvasLayer.ctx.fillRect(
                -(w / 2),
                -(h / 2),
                w,
                h
            );

            return this;
        },
        isAt: function (x, y, canvasLayer){
            var pos = new utils.Point(x, y),
                m = this.model,
                scale = canvasLayer.scale;
                angle = m.get('start_angle'),
                elx = m.get('start_x') * scale,
                ely = m.get('start_y') * scale,
                w = m.get('width') * scale,
                h = m.get('height') * scale;

            pos.translate(-elx, -ely);
            pos.rotate(-angle);

            if (pos.x > -(w/2) && pos.x < w/2 && pos.y > -(h/2) && pos.y < h/2){
                return true;
            }
            return false;
        }
    });
    return new GenericModelView({model:element });

}, plugins.validators.isBox);

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

    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixDef.shape.SetAsBox(element.get('width') / 2, element.get('height') / 2);

    body.CreateFixture(fixDef);

}, [plugins.validators.isBox, plugins.validators.isB2DWorld]);


}(window.B2DPLAYGROUND.plugins, window.B2DPLAYGROUND.utilities));

